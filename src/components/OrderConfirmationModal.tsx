import React, { useState } from "react";
import { CartItem, CustomerData } from "../types";
import { storeInfo } from "../data";
import { X, CheckCircle, Send, Copy, ArrowLeft } from "lucide-react";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customer: CustomerData;
  onConfirmSuccess: () => void;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  cartItems,
  customer,
  onConfirmSuccess,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = customer.type === "delivery" ? (storeInfo.deliveryFee ?? 0) : 0;
  const total = subtotal + deliveryFee;

  const hasPendingPrice = cartItems.some((item) => item.price === null);

  // Generate copyable/sendable customized template WhatsApp text message
  const generateMessageText = () => {
    const header = `Olá! Gostaria de fazer um pedido pelo cardápio virtual do *${storeInfo.name}*.\n`;
    const title = `*--- NOVO PEDIDO VIRTUAL ---*\n`;
    
    const clientBlock = `*Dados do Cliente:*\n• *Nome:* ${customer.name}\n• *Entrega/Retirada:* ${
      customer.type === "delivery" ? `Entrega (${customer.address})` : "Retirada no Balcão"
    }\n${
      customer.type === "delivery" && customer.complement ? `• *Complemento:* ${customer.complement}\n` : ""
    }${
      customer.type === "delivery" && customer.reference ? `• *Referência:* ${customer.reference}\n` : ""
    }• *Forma de Pagamento:* ${customer.payment}\n${
      customer.payment === "Pix" ? `• *Pix CNPJ:* ${storeInfo.pix}\n` : ""
    }`;

    const itemsBlock = `\n*Itens do Pedido:*\n${cartItems
      .map((item) => {
        const itemPriceStr = item.price !== null ? `R$ ${item.price.toFixed(2)}` : "A confirmar";
        const detailsStr = item.details && item.details.length > 0
          ? item.details.map((d) => `   - _${d.label}:_ ${d.value}`).join("\n")
          : "";
        return `• *${item.quantity}x ${item.emoji} ${item.name}*   [${itemPriceStr}]\n${detailsStr}`;
      })
      .join("\n\n")}`;

    const totalBlock = `\n\n*Valores finais:*
Subtotal: R$ ${subtotal.toFixed(2)}
Taxa de entrega: ${customer.type === "delivery" ? `R$ ${deliveryFee.toFixed(2)}` : "Grátis"}
*Total Geral: ${hasPendingPrice ? "Preço a confirmar" : `R$ ${total.toFixed(2)}`}*`;

    const noteBlock = customer.note.trim() ? `\n\n*Observações:* ${customer.note}` : "";
    const footer = `\n\nAguardo a confirmação do pedido pelo atendimento. Obrigado!`;

    return `${header}${title}${clientBlock}${itemsBlock}${totalBlock}${noteBlock}${footer}`;
  };

  const messageText = generateMessageText();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${storeInfo.whatsappNumber}?text=${encoded}`;
    window.open(url, "_blank");
    onConfirmSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      {/* Dark overlay backdrop click close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Confirmation Modal layout */}
      <div className="relative glass-panel w-full max-w-lg rounded-3xl border border-white/5 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header summary info check */}
        <div className="text-center mb-6 shrink-0 space-y-2">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 border border-primary/20">
            <CheckCircle className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Confira seu Pedido</h3>
          <p className="text-sm text-on-surface-variant font-medium">
            Revise as informações abaixo antes de abrir o WhatsApp para finalizar.
          </p>
        </div>

        {/* Inner summary display text */}
        <div className="flex-grow overflow-y-auto bg-[#070707] border border-white/5 rounded-2xl p-5 mb-6 text-on-surface-variant text-xs font-mono whitespace-pre-wrap leading-relaxed select-all selection:bg-primary/20">
          {messageText}
        </div>

        {/* Trigger controls action */}
        <div className="space-y-3 shrink-0">
          <button
            type="button"
            onClick={handleSend}
            className="w-full h-14 bg-[#25D366] text-white rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm tracking-widest leading-none select-none"
          >
            <Send className="w-4 h-4 fill-white" />
            Enviar pelo WhatsApp
          </button>

          <div className="grid grid-cols-2 gap-3 pb-2 select-none">
            <button
              type="button"
              onClick={handleCopy}
              className="h-12 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Copiado!" : "Copiar Texto"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-12 bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white rounded-full font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar e Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
