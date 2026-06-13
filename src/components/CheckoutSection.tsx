import React, { useState } from "react";
import { CartItem, CustomerData } from "../types";
import { storeInfo } from "../data";
import { User, Truck, ShoppingBag, CreditCard, ClipboardList, Wallet, Landmark, PhoneCall } from "lucide-react";

interface CheckoutSectionProps {
  cartItems: CartItem[];
  customerData: CustomerData;
  onCustomerDataChange: (data: CustomerData) => void;
  onConfirmOrder: () => void;
  onBackToMenu: () => void;
}

export default function CheckoutSection({
  cartItems,
  customerData,
  onCustomerDataChange,
  onConfirmOrder,
  onBackToMenu,
}: CheckoutSectionProps) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    onCustomerDataChange({
      ...customerData,
      [field]: value,
    });
    // Reset individual error on write
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const hasPendingPrice = cartItems.some((item) => item.price === null);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = customerData.type === "delivery" ? (storeInfo.deliveryFee ?? 0) : 0;
  const total = subtotal + deliveryFee;

  const validateAndSubmit = () => {
    const errors: Record<string, string> = {};

    if (!customerData.name.trim()) {
      errors.name = "Por favor, preencha o seu nome completo.";
    }

    if (customerData.type === "delivery" && !customerData.address.trim()) {
      errors.address = "Por favor, informe seu endereço para entrega.";
    }

    if (!customerData.payment) {
      errors.payment = "Escolha uma forma de pagamento.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const elem = document.getElementById(`checkout-${firstErrorKey}`);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    onConfirmOrder();
  };

  const paymentOptions = [
    { id: "Pix", label: "Pix", icon: Landmark },
    { id: "Cartão", label: "Cartão", icon: CreditCard },
    { id: "Dinheiro", label: "Dinheiro", icon: Wallet },
  ] as const;

  return (
    <section className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20 select-none">
      {/* Checkout Screen Title */}
      <div className="text-center md:text-left space-y-1">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Finalizar Pedido</h2>
        <p className="text-on-surface-variant text-base">
          Confirme seus detalhes e saboreie o melhor da nossa gastronomia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left: Input panel form (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Identificação Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6" id="checkout-name">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <User className="w-5 h-5 stroke-[2.5]" />
              Identificação
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Nome Completo *
              </label>
              <input
                type="text"
                placeholder="Como deseja ser chamado?"
                value={customerData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full bg-surface-container-high border rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary text-sm ${
                  formErrors.name ? "border-red-500/50 bg-red-500/5" : "border-white/5"
                }`}
              />
              {formErrors.name && (
                <p className="text-xs text-red-400 font-semibold">{formErrors.name}</p>
              )}
            </div>
          </div>

          {/* Entrega ou Retirada Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6" id="checkout-address">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Truck className="w-5 h-5 stroke-[2.5]" />
              Entrega ou Retirada
            </h3>

            {/* Toggle Toggle switcher slider */}
            <div className="p-1.5 bg-surface-container-highest rounded-full grid grid-cols-2 gap-2 border border-white/5">
              <button
                type="button"
                onClick={() => handleInputChange("type", "delivery")}
                className={`py-3 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                  customerData.type === "delivery"
                    ? "bg-primary-container text-on-primary-container shadow-md"
                    : "text-on-surface-variant hover:text-white"
                }`}
              >
                Entrega
              </button>
              
              <button
                type="button"
                onClick={() => handleInputChange("type", "pickup")}
                className={`py-3 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                  customerData.type === "pickup"
                    ? "bg-primary-container text-on-primary-container shadow-md"
                    : "text-on-surface-variant hover:text-white"
                }`}
              >
                Retirada
              </button>
            </div>

            {/* If delivery is selected */}
            {customerData.type === "delivery" ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Endereço Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Rua, número, bairro e ponto de referência"
                    value={customerData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`w-full bg-surface-container-high border rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary text-sm ${
                      formErrors.address ? "border-red-500/50 bg-red-500/5" : "border-white/5"
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-xs text-red-400 font-semibold">{formErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Complemento (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Apto, Bloco..."
                      value={customerData.complement}
                      onChange={(e) => handleInputChange("complement", e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Referência (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Perto de..."
                      value={customerData.reference}
                      onChange={(e) => handleInputChange("reference", e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* If Local Pickup is selected */
              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-2 text-sm text-primary animate-in fade-in duration-300">
                <p className="font-bold">Você escolheu retirar no balcão da loja.</p>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Endereço para retirada: <span className="text-white font-bold">{storeInfo.address}</span>. <br />
                  Seu pedido estará pronto em aproximadamente 30-40 minutos após o envio da mensagem.
                </p>
              </div>
            )}
          </div>

          {/* Forma de Pagamento Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6" id="checkout-payment">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Landmark className="w-5 h-5 stroke-[2.5]" />
              Forma de Pagamento
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {paymentOptions.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = customerData.payment === opt.id;
                
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleInputChange("payment", opt.id)}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all cursor-pointer text-center group ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-white/5 bg-surface-container-low text-on-surface-variant hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <IconComp className="w-6 h-6 mb-2 text-on-surface-variant group-hover:text-primary transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            {formErrors.payment && (
              <p className="text-xs text-red-400 font-semibold mt-2">{formErrors.payment}</p>
            )}

            {customerData.payment === "Pix" && (
              <div className="p-4 rounded-xl bg-surface-container-high border border-white/5 text-xs text-on-surface-variant space-y-1">
                <p className="font-bold text-white">Chave Pix CNPJ:</p>
                <p className="font-mono text-primary font-bold text-sm select-all">{storeInfo.pix}</p>
                <p className="pt-1">A confirmação do pagamento é exigida no WhatsApp para liberação do pedido.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Resumo Sidebar Sidebar (2 cols) */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/5 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-white mb-4 pb-4 border-b border-white/5">
                Seu Pedido
              </h3>

              {/* Items listing summaries */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto hide-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.cartKey} className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-bold text-white">
                        {item.quantity}x {item.emoji} {item.name}
                      </p>
                      
                      {item.details && item.details.length > 0 && (
                        <div className="text-[11px] text-on-surface-variant mt-0.5 space-y-0.5 pl-1">
                          {item.details.map((d, index) => (
                            <p key={index} className="line-clamp-1">
                              • {d.label}: {d.value}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="font-bold text-primary shrink-0 pl-3">
                      {item.price !== null ? `R$ ${item.price.toFixed(2)}` : "A confirmar"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total calculation rows */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-on-surface-variant text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">R$ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-on-surface-variant text-sm">
                  <span>Taxa de Entrega</span>
                  <span className="font-semibold text-white">
                    {customerData.type === "delivery" ? `R$ ${deliveryFee.toFixed(2)}` : "Grátis"}
                  </span>
                </div>
                
                <div className="flex justify-between text-white text-lg pt-3 border-t border-white/5 font-extrabold select-all">
                  <span>Total Geral</span>
                  <span className="text-primary text-xl">
                    {hasPendingPrice ? "Preço a confirmar" : `R$ ${total.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Action trigger button CONFIRMAR PEDIDO */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={validateAndSubmit}
                  className="w-full bg-primary text-on-primary text-base font-extrabold py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer text-center uppercase tracking-wider burnt-orange-glow"
                >
                  Confirmar Pedido
                </button>

                <button
                  type="button"
                  onClick={onBackToMenu}
                  className="w-full text-on-surface-variant hover:text-white transition-colors py-2 text-xs font-bold text-center underline cursor-pointer uppercase tracking-widest"
                >
                  Voltar e Adicionar Itens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
