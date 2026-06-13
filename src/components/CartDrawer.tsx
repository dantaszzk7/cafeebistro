import React from "react";
import { CartItem } from "../types";
import { X, ShoppingBasket, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { storeInfo } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncreaseQty: (cartKey: string) => void;
  onDecreaseQty: (cartKey: string) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
  onGoToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onClearCart,
  onGoToCheckout,
}: CartDrawerProps) {
  const hasPendingPrice = cartItems.some((item) => item.price === null);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = storeInfo.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;

  return (
    <div className={`fixed inset-0 z-[80] transition-opacity duration-300 ${
      isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
    }`}>
      {/* Background dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Slide-out cart drawer */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-surface-container-low shadow-2xl transition-transform duration-500 flex flex-col border-l border-white/5 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Drawer Header */}
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBasket className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Scroll Container */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant/40">
                <ShoppingBasket className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white font-bold">Seu pedido está vazio</p>
                <p className="text-on-surface-variant text-sm mt-1 max-w-[240px]">
                  Que tal dar uma olhada e adicionar nossas delícias no seu pedido?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.cartKey} 
                  className="flex gap-4 p-4 rounded-2xl bg-surface-container border border-white/5 shadow-sm hover:border-primary/10 transition-colors"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item metadata */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-white text-sm">
                          {item.emoji} {item.name}
                        </h4>
                        <span className="text-primary font-bold text-sm shrink-0">
                          {item.price !== null ? `R$ ${item.price.toFixed(2)}` : "A confirmar"}
                        </span>
                      </div>
                      
                      {/* Configuration Details summary list */}
                      {item.details && item.details.length > 0 && (
                        <div className="mt-1 text-xs text-on-surface-variant space-y-0.5 max-w-[200px]">
                          {item.details.map((d, index) => (
                            <p key={index} className="line-clamp-1">
                              • <span className="font-medium text-white/50">{d.label}: </span> 
                              <span>{d.value}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stepper controls */}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                      <div className="flex items-center bg-surface-container-high rounded-full p-0.5 border border-white/5">
                        <button
                          type="button"
                          onClick={() => onDecreaseQty(item.cartKey)}
                          className="w-7 h-7 flex items-center justify-center text-primary hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncreaseQty(item.cartKey)}
                          className="w-7 h-7 flex items-center justify-center text-primary hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartKey)}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer calculations display */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-surface-container-high border-t border-white/5">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxa de entrega</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/5">
                <span>Total</span>
                <span className="text-primary">
                  {hasPendingPrice ? "Preço a confirmar" : `R$ ${total.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClearCart}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white border border-white/5 rounded-2xl font-bold text-sm transition-colors cursor-pointer uppercase tracking-wider h-14"
              >
                Limpar
              </button>
              
              <button
                type="button"
                onClick={onGoToCheckout}
                className="flex-grow h-14 bg-primary text-on-primary rounded-2xl font-bold text-base hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer burnt-orange-glow uppercase tracking-wider"
              >
                Confirmar
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
