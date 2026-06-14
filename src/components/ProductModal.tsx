import React, { useState, useEffect } from "react";
import { Product, Variant, Addon, CartItem } from "../types";
import { X, Plus, Minus, CheckCircle } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, "cartKey">) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState<number>(1);



  // Reset fields when product changes
  useEffect(() => {
    setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    setSelectedAddons([]);
    setCustomFields({});
    setValidationErrors({});
    setQuantity(1);
  }, [product]);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleAddonToggle = (addon: Addon) => {
    const exists = selectedAddons.find((a) => a.id === addon.id);
    if (exists) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleCustomFieldChange = (fieldId: string, value: string) => {
    setCustomFields((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    
    // Clear validation error when a value is selected/typed
    if (value) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[fieldId];
        return copy;
      });
    }
  };

  const handleCheckboxToggle = (fieldId: string, option: string) => {
    const field = product.customFields.find((f) => f.id === fieldId);
    setCustomFields((prev) => {
      const currentVal = prev[fieldId] || "";
      const selectedList = currentVal ? currentVal.split(", ").filter(Boolean) : [];
      let newList: string[];
      if (selectedList.includes(option)) {
        newList = selectedList.filter((item) => item !== option);
        // Clear validation error when we change/remove selection
        setValidationErrors((prevErrors) => {
          const copy = { ...prevErrors };
          delete copy[fieldId];
          return copy;
        });
      } else {
        if (field && field.maxChoices !== undefined && selectedList.length >= field.maxChoices) {
          // If we reached max choices, show warning and ignore the click
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [fieldId]: field.id === "opcoes-carne"
              ? "Você pode escolher apenas 2 opções de carne."
              : field.id === "opcoes-acompanhamento"
              ? "Você pode escolher apenas 2 opções de acompanhamento."
              : field.id === "sabores" && product.id === "tapioca"
              ? "Você pode escolher apenas 2 sabores."
              : `Você pode escolher apenas ${field.maxChoices} opções.`
          }));
          return prev;
        }
        newList = [...selectedList, option];
        // Clear validation error when a value is selected
        setValidationErrors((prevErrors) => {
          const copy = { ...prevErrors };
          delete copy[fieldId];
          return copy;
        });
      }
      const newValue = newList.join(", ");
      return {
        ...prev,
        [fieldId]: newValue,
      };
    });
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Calculating final price
  const isPendingPrice = product.price === null && !selectedVariant;
  
  const calculateSinglePrice = () => {
    if (isPendingPrice) return null;
    
    let base = selectedVariant ? (selectedVariant.price ?? 0) : (product.price ?? 0);
    
    if (product.id === "cafe-da-manha") {
      const selectedMeats = (customFields["opcoes-carne"] || "").split(", ").filter(Boolean);
      if (selectedMeats.includes("Charque") || selectedMeats.includes("Carne de sol")) {
        base = 12.99;
      }
    }
    

    let sum = base;
    
    selectedAddons.forEach((addon) => {
      sum += addon.price ?? 0;
    });
    
    return sum;
  };

  const singlePrice = calculateSinglePrice();
  const totalPrice = singlePrice !== null ? singlePrice * quantity : null;

  const handleSubmit = () => {
    // Validate required custom fields
    const errors: Record<string, string> = {};
    product.customFields.forEach((field) => {
      if (field.type === "checkbox") {
        const selectedList = (customFields[field.id] || "").split(", ").filter(Boolean);
        if (field.required && selectedList.length === 0) {
          errors[field.id] = field.id === "opcoes-principais"
            ? "Escolha pelo menos 1 opção principal."
            : field.id === "opcoes-carne"
            ? "Escolha pelo menos 1 opção de carne."
            : field.id === "opcoes-acompanhamento"
            ? "Escolha 2 opções de acompanhamento."
            : field.id === "sabores" && product.id === "tapioca"
            ? "Escolha 2 sabores para sua tapioca."
            : `Escolha pelo menos uma opção.`;
        } else if (field.minChoices !== undefined && selectedList.length < field.minChoices) {
          errors[field.id] = field.id === "opcoes-principais"
            ? "Escolha pelo menos 1 opção principal."
            : field.id === "opcoes-carne"
            ? "Escolha pelo menos 1 opção de carne."
            : field.id === "opcoes-acompanhamento"
            ? "Escolha 2 opções de acompanhamento."
            : field.id === "sabores" && product.id === "tapioca"
            ? "Escolha 2 sabores para sua tapioca."
            : `Selecione pelo menos ${field.minChoices} opções.`;
        } else if (field.maxChoices !== undefined && selectedList.length > field.maxChoices) {
          errors[field.id] = field.id === "opcoes-principais"
            ? "Você pode escolher até 2 opções principais."
            : field.id === "opcoes-carne"
            ? "Você pode escolher até 2 opções de carne."
            : field.id === "opcoes-acompanhamento"
            ? "Você pode escolher apenas 2 opções de acompanhamento."
            : field.id === "sabores" && product.id === "tapioca"
            ? "Você pode escolher apenas 2 sabores."
            : `Você pode escolher apenas ${field.maxChoices} opções.`;
        }
      } else {
        if (field.required && !customFields[field.id]) {
          errors[field.id] = field.id === "carne"
            ? "Escolha a carne."
            : field.id === "carne-nobre"
            ? "Escolha a carne nobre antes de adicionar ao pedido."
            : field.id === "quantidade-porcoes"
            ? "Escolha a quantidade de porções."
            : field.id === "bebida"
            ? "Escolha a bebida do combo."
            : (field.id === "primeiro-sabor" || field.id === "segundo-sabor")
            ? "Escolha os dois sabores da tapioca."
            : "Escolha um sabor ou marca.";
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const details = [];

    // Add variant name
    if (selectedVariant) {
      details.push({
        id: "tamanho",
        label: "Tamanho",
        value: `${selectedVariant.name}${selectedVariant.volume ? ` (${selectedVariant.volume})` : ""}`
      });
    }

    // Add selected addons
    selectedAddons.forEach((a) => {
      details.push({
        id: `addon-${a.id}`,
        label: "Adicional",
        value: `${a.name}${a.price ? ` (+R$ ${a.price.toFixed(2)})` : ""}`
      });
    } );

    // Add custom fields
    product.customFields.forEach((field) => {
      const val = customFields[field.id];
      if (val) {
        let label = field.label;
        if (product.id === "cafe-da-manha") {
          if (field.id === "opcoes-principais") {
            label = "Opções principais";
          } else if (field.id === "opcoes-carne") {
            label = "Opções de carne";
          } else if (field.id === "observacao") {
            label = "Observação do pedido";
          }
        } else if (product.id === "almoco") {
          if (field.id === "carne") {
            label = "Carne";
          } else if (field.id === "acompanhamentos") {
            label = "Acompanhamentos";
          } else if (field.id === "observacao") {
            label = "Observação do almoço";
          }
        } else if (product.id === "almoco-nobre") {
          if (field.id === "carne-nobre") {
            label = "Carne nobre";
          } else if (field.id === "acompanhamentos") {
            label = "Acompanhamentos";
          } else if (field.id === "observacao") {
            label = "Observação do almoço";
          }
        } else if (product.id === "combo-hamburguer-artesanal" || product.id === "combo-hamburguer-tradicional" || product.id === "combo-pao-com-charque") {
          if (field.id === "bebida") {
            label = "Bebida";
          } else if (field.id === "detalhe-bebida") {
            label = "Detalhe da bebida";
          } else if (field.id === "observacao") {
            label = "Observação do combo";
          }
        } else if (product.id === "tapioca") {
          if (field.id === "primeiro-sabor") {
            label = "Primeiro sabor";
          } else if (field.id === "segundo-sabor") {
            label = "Segundo sabor";
          } else if (field.id === "observacao") {
            label = "Observação da tapioca";
          }
        } else if (product.id === "cafe-da-manha-almoco" || product.id === "cuscuz" || product.id === "inhame" || product.id === "macaxeira") {
          if (field.id === "opcoes-carne") {
            label = "Opções de carne";
          } else if (field.id === "opcoes-acompanhamento") {
            label = "Opções escolhidas";
          } else if (field.id === "observacao") {
            label = "Observação do pedido";
          } else if (field.id === "quantidade-porcoes") {
            label = "Quantidade de porções";
          }
        }
        details.push({
          id: `custom-${field.id}`,
          label: label,
          value: val
        });
      }
    });

    onAddToCart({
      id: product.id,
      name: product.name,
      price: totalPrice,
      basePrice: singlePrice,
      quantity,
      details,
      emoji: product.emoji,
      image: product.image,
      selectedVariant,
      selectedAddons,
      customFieldValues: customFields
    });
  };

  return (
    <div className="fixed inset-0 bg-black/72 backdrop-blur-sm z-[70] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Overlay Backdrop clickable */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-up dialog box */}
      <div 
        className="relative w-full md:max-w-2xl bg-surface rounded-t-[32px] md:rounded-[32px] max-h-[85vh] flex flex-col border border-white/5 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Draw Grabber indicator on Mobile */}
        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mt-3 mb-1 md:hidden shrink-0"></div>

        {/* Product Hero Image Section */}
        {product.image && (
          <div className="relative w-full h-[140px] sm:h-[180px] md:h-[240px] shrink-0 overflow-hidden bg-surface-container-high border-b border-white/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80";
              }}
            />
            {/* Soft dark overlays for readability/beauty */}
            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>

            {/* Floating Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer z-10 shadow-lg flex items-center justify-center h-9 w-9"
              title="Fechar"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex justify-between items-start px-6 py-4 md:pt-6 border-b border-white/5 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{product.emoji}</span>
              <h2 className="text-2xl font-extrabold text-white">{product.name}</h2>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>
          {!product.image && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body (Scrollable Container) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 hide-scrollbar pb-6">
          
          {/* Variants section (Sizes) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>📏</span> Escolha o Tamanho
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full normal-case font-extrabold ml-auto">
                  Obrigatório
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVariantSelect(v)}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all active:scale-95 cursor-pointer text-center ${
                        isSelected
                          ? "border-primary bg-secondary-container/20 text-primary"
                          : "border-white/5 bg-white/5 text-on-surface-variant hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <span className="font-bold text-sm sm:text-base leading-tight">{v.name}</span>
                      {v.volume && (
                        <span className="text-[11px] text-on-surface-variant mt-0.5 leading-none">{v.volume}</span>
                      )}
                      {v.price !== null && (
                        <span className="text-xs font-semibold mt-1">R$ {v.price.toFixed(2)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons section */}
          {product.addons && product.addons.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                🍿 Adicionais (Opcional)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleAddonToggle(addon)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                        isChecked
                          ? "border-primary/40 bg-primary/5 text-white"
                          : "border-white/5 bg-white/5 text-on-surface-variant hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-primary border-primary text-on-primary" : "border-white/20"
                        }`}>
                          {isChecked && <span className="text-[10px] font-black">✓</span>}
                        </div>
                        <span className="font-semibold text-sm">{addon.name}</span>
                      </div>
                      
                      {addon.price !== null && (
                        <span className="text-primary text-sm font-bold">
                          + R$ {addon.price.toFixed(2)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Fields section */}
          {product.customFields && product.customFields.length > 0 && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                📝 Customize seu item
              </h4>

              <div className="space-y-4">
                {product.customFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="block text-sm text-on-surface-variant font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {field.label}
                        {field.required && (
                          <span className="text-[10px] bg-red-400/10 text-red-400 px-1.5 py-0.5 rounded-full font-extrabold">
                            Obrigatório
                          </span>
                        )}
                      </span>
                      {validationErrors[field.id] && (
                        <span className="text-xs text-red-400 font-bold animate-pulse">
                          {validationErrors[field.id]}
                        </span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={customFields[field.id] || ""}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        className={`w-full bg-surface-container border rounded-2xl p-4 text-white focus:outline-none focus:border-primary text-sm cursor-pointer transition-all ${
                          validationErrors[field.id] ? "border-red-500 bg-red-500/5 focus:border-red-500" : "border-white/5"
                        }`}
                      >
                        <option value="">Selecione uma opção...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                        {field.options?.map((opt) => {
                          const selectedList = (customFields[field.id] || "").split(", ").filter(Boolean);
                          const isChecked = selectedList.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleCheckboxToggle(field.id, opt)}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm transition-all text-left cursor-pointer ${
                                isChecked
                                  ? "border-primary bg-primary/10 text-white"
                                  : "border-white/5 bg-white/5 text-on-surface-variant hover:border-white/10"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                                isChecked ? "bg-primary border-primary text-on-primary" : "border-white/20"
                              }`}>
                                {isChecked && <span className="text-[8px] font-black">✓</span>}
                              </div>
                              <span className="font-medium text-xs sm:text-sm">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={customFields[field.id] || ""}
                        placeholder={field.placeholder || "Ex: sem açúcar, etc."}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        className={`w-full bg-surface-container border rounded-2xl p-4 text-white focus:outline-none focus:border-primary text-sm transition-all ${
                          validationErrors[field.id] ? "border-red-500 bg-red-500/5 focus:border-red-500" : "border-white/5"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer Action panel */}
        <div className="border-t border-white/5 p-4 sm:p-6 bg-surface-container-low flex items-center justify-between gap-2.5 shrink-0 z-20">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-3 sm:px-5 rounded-full border border-white/10 hover:bg-white/5 text-on-surface-variant hover:text-white transition-all text-[11px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer shrink-0"
          >
            Cancelar
          </button>

          {/* Quantity Stepper */}
          <div className="flex items-center bg-surface-container-highest rounded-full p-1 h-12 border border-white/5 shrink-0 select-none">
            <button
              type="button"
              onClick={decrementQty}
              className="w-8 h-full flex items-center justify-center text-primary hover:text-white transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="px-2 font-bold text-sm text-white w-6 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={incrementQty}
              className="w-8 h-full flex items-center justify-center text-primary hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* CTA Add logic */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 h-12 bg-primary text-on-primary rounded-full font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer burnt-orange-glow select-none px-3 sm:px-4 uppercase tracking-wider"
          >
            <span>Adicionar</span>
            <span className="opacity-85 text-[10px] sm:text-xs font-semibold pl-1.5 border-l border-on-primary/15 whitespace-nowrap">
              {totalPrice !== null ? `R$ ${totalPrice.toFixed(2)}` : "Confirmar"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
