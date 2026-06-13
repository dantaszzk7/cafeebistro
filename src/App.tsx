import React, { useState, useEffect, useRef } from "react";
import { categories, products, storeInfo } from "./data";
import { CartItem, CustomerData, Order, Product } from "./types";

// Import custom components
import TopAppBar from "./components/TopAppBar";
import BottomNavBar from "./components/BottomNavBar";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutSection from "./components/CheckoutSection";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import SuccessToast from "./components/SuccessToast";
import OrdersTracker from "./components/OrdersTracker";
import InfoSection from "./components/InfoSection";

import { Utensils, ReceiptText, ShieldAlert, Heart, Landmark, HelpCircle } from "lucide-react";

export default function App() {
  // Navigation Routing States
  const [currentTab, setCurrentTab] = useState<"menu" | "cart" | "orders" | "info">("menu");
  
  // Cart, Customizer and Drawer States
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cafe_bistro_cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Success Toast States
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Active category select filter
  const [activeCategory, setActiveCategory] = useState("todos");

  // Drag-to-scroll refs and handlers for Categories horizontal scroll
  const tabsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeft.current = tabsRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    tabsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Custom uploaded images persistence state
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("cafe_bistro_custom_images");
    return saved ? JSON.parse(saved) : {};
  });

  const handleUpdateImage = (key: string, base64Data: string) => {
    setCustomImages((prev) => {
      const next = { ...prev, [key]: base64Data };
      localStorage.setItem("cafe_bistro_custom_images", JSON.stringify(next));
      return next;
    });
    handleShowToast("Imagem salva! Ela permanecerá no sistema.");
  };

  const handleRemoveCustomImage = (key: string) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[key];
      localStorage.setItem("cafe_bistro_custom_images", JSON.stringify(next));
      return next;
    });
    handleShowToast("Imagem restaurada para o padrão!");
  };

  // Resolved ImgBB direct image URLs state
  const [resolvedIbbImages, setResolvedIbbImages] = useState<Record<string, string>>({});
  // Track queued or in-progress resolution requests to completely prevent infinite loops
  const resolutionQueued = useRef<Record<string, boolean>>({});

  // Fetch and resolve any short landing page ImgBB image URLs programmatically once
  useEffect(() => {
    // Collect all candidates: all products plus "hero"
    const candidates = [
      ...products.map((p) => ({ id: p.id, image: customImages[p.id] || p.image, name: p.name })),
      { id: "hero", image: customImages["hero"] || "https://i.ibb.co/FLmVXWGs/cardapio-virtual.png", name: "Capa do menu" }
    ];

    candidates.forEach((cand) => {
      const currentImage = cand.image;
      if (
        currentImage &&
        currentImage.includes("ibb.co/") &&
        !currentImage.includes("i.ibb.co/") &&
        !resolvedIbbImages[cand.id] &&
        !resolutionQueued.current[cand.id]
      ) {
        // Mark as queued immediately to lock further triggers
        resolutionQueued.current[cand.id] = true;

        const tryFetch = (proxyUrl: string, useAllorigins: boolean = false) => {
          fetch(proxyUrl)
            .then((res) => {
              if (!res.ok) throw new Error("Proxy response error: " + res.status);
              return useAllorigins ? res.json() : res.text();
            })
            .then((data) => {
              let html = "";
              if (useAllorigins && data && typeof data === "object") {
                html = data.contents || "";
              } else if (typeof data === "string") {
                html = data;
              }

              if (!html) throw new Error("Empty HTML content received");

              const match = html.match(/<meta\s+property=["']og:image["']\s+content=["'](https:\/\/i\.ibb\.co\/[^"']+)["']/i) ||
                            html.match(/(https:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>]+)/);
              if (match && match[1]) {
                setResolvedIbbImages((prev) => ({
                  ...prev,
                  [cand.id]: match[1]
                }));
              } else {
                throw new Error("Direct image URL pattern not found");
              }
            })
            .catch((err) => {
              if (!useAllorigins) {
                // Primary CORS proxy failed, try fallback allorigins proxy
                const fallbackUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(currentImage)}`;
                tryFetch(fallbackUrl, true);
              } else {
                // Both proxies failed/blocked. Bypassing gracefully without raising uncaught exceptions
                console.warn(`[ImgBB Fallback] Custom image for "${cand.name}" could not be fetched. Leaving default.`);
              }
            });
        };

        // Try primary CORS proxy
        const primaryUrl = `https://corsproxy.io/?${encodeURIComponent(currentImage)}`;
        tryFetch(primaryUrl, false);
      }
    });
  }, [customImages, resolvedIbbImages]);

  // Enrich products list with any custom uploaded images
  const enrichedProducts = products.map((prod) => {
    let img = prod.image;
    if (customImages[prod.id]) {
      img = customImages[prod.id];
    }
    if (resolvedIbbImages[prod.id]) {
      img = resolvedIbbImages[prod.id];
    }
    return { ...prod, image: img };
  });

  // Orders History State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("cafe_bistro_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Client checkout state
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    type: "delivery",
    address: "",
    complement: "",
    reference: "",
    payment: "Pix",
    note: ""
  });

  // Save Cart and Orders to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cafe_bistro_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cafe_bistro_orders", JSON.stringify(orders));
  }, [orders]);

  // Determine if restaurant is currently open based on local hour 7h to 16h
  const checkIsOpen = () => {
    const now = new Date();
    const hrs = now.getHours();
    return hrs >= storeInfo.openingHour && hrs < storeInfo.closingHour;
  };
  const isOpen = checkIsOpen();

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  // Add Item to cart details from either Modal customizer or direct Click
  const handleProductAddBtn = (product: Product) => {
    // If the product has options/addons, open customizer modal
    const hasConfig = 
      (product.variants && product.variants.length > 0) ||
      (product.addons && product.addons.length > 0) ||
      (product.customFields && product.customFields.length > 0);

    if (hasConfig) {
      setSelectedProduct(product);
    } else {
      // Direct add to cart
      const cartKey = `${product.id}-default`;
      setCart((prevCart) => {
        const exists = prevCart.find((it) => it.cartKey === cartKey);
        if (exists) {
          return prevCart.map((it) => 
            it.cartKey === cartKey ? { ...it, quantity: it.quantity + 1 } : it
          );
        } else {
          return [
            ...prevCart,
            {
              cartKey,
              id: product.id,
              name: product.name,
              price: product.price,
              basePrice: product.price,
              quantity: 1,
              details: [],
              emoji: product.emoji,
              image: product.image,
              selectedAddons: [],
              customFieldValues: {}
            }
          ];
        }
      });
      handleShowToast("Adicionado ao pedido!");
    }
  };

  const handleAddToCartFromModal = (newCartItem: Omit<CartItem, "cartKey">) => {
    // Generate distinct hash key based on customizations
    const detailsSignature = newCartItem.details
      .map((d) => `${d.id}:${d.value.toLowerCase().trim()}`)
      .join("|");
    
    // Hash details to key
    let hash = 0;
    for (let i = 0; i < detailsSignature.length; i++) {
      hash = ((hash << 5) - hash) + detailsSignature.charCodeAt(i);
      hash |= 0;
    }
    const safeHash = Math.abs(hash).toString(36);
    const cartKey = `${newCartItem.id}-${safeHash}`;

    setCart((prevCart) => {
      const exists = prevCart.find((it) => it.cartKey === cartKey);
      if (exists) {
        return prevCart.map((it) =>
          it.cartKey === cartKey ? { ...it, quantity: it.quantity + newCartItem.quantity } : it
        );
      } else {
        return [...prevCart, { ...newCartItem, cartKey }];
      }
    });

    setSelectedProduct(null);
    handleShowToast("Customizado e adicionado ao pedido!");
  };

  // Quantity controls and items deletion
  const handleIncreaseQty = (key: string) => {
    setCart((prev) =>
      prev.map((it) => (it.cartKey === key ? { ...it, quantity: it.quantity + 1 } : it))
    );
  };

  const handleDecreaseQty = (key: string) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.cartKey === key) {
            const nextQty = it.quantity - 1;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter((it): it is CartItem => it !== null)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((it) => it.cartKey !== key));
    handleShowToast("Item removido.");
  };

  const handleClearCart = () => {
    const isConfirmed = window.confirm("Deseja realmente limpar todos os itens do carrinho?");
    if (isConfirmed) {
      setCart([]);
      setIsCartDrawerOpen(false);
      handleShowToast("Carrinho limpo.");
    }
  };

  const handleConfirmCheckoutAndPrompt = () => {
    setIsConfirmModalOpen(true);
  };

  // Completed Checkout Order - Store in active local tracker
  const handleOrderConfirmedSuccess = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price ?? 0), 0);
    const deliveryFee = customerData.type === "delivery" ? (storeInfo.deliveryFee ?? 0) : 0;
    const finalTotal = subtotal + deliveryFee;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      timestamp: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      items: [...cart],
      customer: { ...customerData },
      total: finalTotal,
      status: "Pendente"
    };

    setOrders((prev) => [newOrder, ...prev]);
    setIsConfirmModalOpen(false);
    setCart([]); // Clear checkout cart
    setCurrentTab("orders"); // Direct user to receipt tracking
    handleShowToast("Pedido enviado! Acompanhe o recibo abaixo.");
  };

  const handleClearHistory = () => {
    const isConfirmed = window.confirm("Excluir todo o seu histórico local de recibos?");
    if (isConfirmed) {
      setOrders([]);
      localStorage.removeItem("cafe_bistro_orders");
      handleShowToast("Histórico limpo.");
    }
  };

  // Nav categories filter
  const filteredProducts = activeCategory === "todos"
    ? [...enrichedProducts]
    : enrichedProducts.filter((prod) => prod.category === activeCategory);

  // Safely sort a copy of the filtered products array to guarantee image stability
  const orderedProducts = [...filteredProducts].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen text-base-on-bg bg-base-bg font-sans flex flex-col justify-between selection:bg-primary/20">
      
      {/* Top Banner Header */}
      <TopAppBar
        onCartClick={() => setIsCartDrawerOpen(true)}
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
      />

      {/* Main Panel Canvas Area */}
      <main className="flex-grow pt-20 pb-36 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Tab content Router router display */}
        {currentTab === "menu" && (
          <div className="space-y-12">
            
            {/* Hero Section Banner */}
            <HeroSection
              onVerCardapioClick={() => {
                const menuElem = document.getElementById("virtual-menu-heading");
                if (menuElem) {
                  menuElem.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              isOpen={isOpen}
              customImage={resolvedIbbImages["hero"] || customImages["hero"]}
              onUpdateImage={(base64) => handleUpdateImage("hero", base64)}
              hasCustomImage={!!customImages["hero"]}
              onRemoveImage={() => handleRemoveCustomImage("hero")}
            />

            {/* General Disclaimer Closed Indicator */}
            {!isOpen && (
              <div className="p-5 rounded-3xl border border-red-500/10 bg-red-500/5 text-red-300 flex items-start gap-4 animate-pulse">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm leading-relaxed">
                  <span className="font-bold">Aviso importante:</span> Estamos fora do horário comercial de atendimento ({storeInfo.openingText}). Seu pedido será montado localmente no carrinho, porém o processamento por WhatsApp será finalizado no próximo turno operacional útil. Agradecemos a compreensão.
                </p>
              </div>
            )}

            {/* Category horizontal scroll navigation chips slider with seamless touch/mouse drag & smooth center-selection alignment */}
            <div className="sticky top-16 z-30 bg-base-bg/95 backdrop-blur-md py-4 border-b border-white/5" id="virtual-menu-heading">
              <div
                ref={tabsRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="category-tabs flex gap-3 overflow-x-auto overflow-y-hidden hide-scrollbar select-none cursor-grab active:cursor-grabbing scroll-smooth"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={(e) => {
                        setActiveCategory(cat.id);
                        // Center the clicked category smoothly in the slider navigation track
                        e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center"
                        });
                      }}
                      className={`category-btn flex-none shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer active:scale-95 duration-150 ${
                        isActive
                          ? "bg-primary-container/15 text-primary border-primary"
                          : "border-white/5 text-on-surface-variant hover:text-white hover:border-white/10"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Menu Items Showcase grids layout */}
            <div className="space-y-6">
              <div className="flex justify-between items-center select-none">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {categories.find((c) => c.id === activeCategory)?.name || "Almoço"}
                </h2>
                <span className="text-xs text-primary uppercase font-extrabold tracking-widest leading-none">
                  Sabor & Precisão
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orderedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddClick={handleProductAddBtn}
                  />
                ))}
              </div>
            </div>

            {/* Bento Grid highlighting Hours and maps location */}
            <div className="border-t border-white/5 pt-12 space-y-6">
              <h3 className="text-xl font-bold text-white select-none">Explore Nossa Casa</h3>
              <BentoGrid />
            </div>

          </div>
        )}

        {currentTab === "cart" && (
          <CheckoutSection
            cartItems={cart}
            customerData={customerData}
            onCustomerDataChange={setCustomerData}
            onConfirmOrder={handleConfirmCheckoutAndPrompt}
            onBackToMenu={() => setCurrentTab("menu")}
          />
        )}

        {currentTab === "orders" && (
          <OrdersTracker
            orders={orders}
            onRefresh={() => {
              const saved = localStorage.getItem("cafe_bistro_orders");
              if (saved) setOrders(JSON.parse(saved));
              handleShowToast("Histórico atualizado!");
            }}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentTab === "info" && (
          <InfoSection />
        )}

      </main>

      {/* Footer Branding credits */}
      <footer className="w-full px-4 md:px-8 bg-[#0b0b0b] border-t border-white/5 py-12 mb-20 text-xs text-on-surface-variant select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:items-start">
          <div className="max-w-xs space-y-3">
            <h4 className="text-sm font-extrabold text-white">{storeInfo.name}</h4>
            <p className="leading-relaxed">
              Hospitalidade artesanal de alto padrão. Localizado no coração pulsante comercial do bairro. Servindo rituais gastronômicos inesquecíveis desde 2024.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="flex flex-col gap-2">
              <span className="font-extrabold text-[10px] uppercase text-white tracking-widest pl-0.5">Suporte</span>
              <button onClick={() => setCurrentTab("info")} className="text-left hover:text-white transition-colors cursor-pointer">Ajuda & Horários</button>
              <button onClick={() => setCurrentTab("info")} className="text-left hover:text-white transition-colors cursor-pointer">Localização</button>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="font-extrabold text-[10px] uppercase text-white tracking-widest pl-0.5">Faturamento</span>
              <span className="text-primary font-semibold font-mono">{storeInfo.pix}</span>
              <span className="text-white/60">PIX CNPJ Verificado</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/55">
          <p>© 2026 {storeInfo.name}. Todos os direitos reservados. Hospitalidade Artesanal.</p>
          <div className="text-[10px] uppercase font-bold tracking-widest text-primary">
            Feito para satisfazer seu paladar
          </div>
        </div>
      </footer>

      {/* Persistent drawer sliding cart overlay */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cart}
        onIncreaseQty={handleIncreaseQty}
        onDecreaseQty={handleDecreaseQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onGoToCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentTab("cart");
        }}
      />

      {/* Product choices modal sheet customizer */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCartFromModal}
      />

      {/* Finalizing WhatsApp delivery prompt verification modal dialog */}
      <OrderConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        cartItems={cart}
        customer={customerData}
        onConfirmSuccess={handleOrderConfirmedSuccess}
      />

      {/* Dynamic persistent pop up status alerts */}
      <SuccessToast
        message={toastMessage}
        isVisible={isToastVisible}
        onHide={() => setIsToastVisible(false)}
      />

      {/* Sticky Bottom Tab Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
      />

    </div>
  );
}
