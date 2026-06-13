import React from "react";
import { Order } from "../types";
import { ReceiptText, Clock, MapPin, Landmark, RefreshCw } from "lucide-react";

interface OrdersTrackerProps {
  orders: Order[];
  onRefresh: () => void;
  onClearHistory?: () => void;
}

export default function OrdersTracker({ orders, onRefresh, onClearHistory }: OrdersTrackerProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 select-none">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Meus Pedidos</h2>
          <p className="text-sm text-on-surface-variant">
            Histórico das suas encomendas enviadas direta do cardápio virtual.
          </p>
        </div>

        <div className="flex gap-2">
          {onClearHistory && orders.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              className="px-4 py-2 border border-red-500/10 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-bold rounded-full cursor-pointer transition-colors"
            >
              Excluir Histórico
            </button>
          )}

          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-full cursor-pointer transition-all active:scale-95 duration-150 border border-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recarregar
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant/40">
            <ReceiptText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Nenhum pedido recente</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto mt-1 leading-relaxed">
              Você ainda não finalizou nenhum pedido nesta sessão. Ao completar um carrinho e enviar pelo WhatsApp, seu recibo aparecerá listado aqui para acompanhamento!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => {
            const deliveryFee = order.customer.type === "delivery" ? 7.00 : 0;
            return (
              <div 
                key={order.id} 
                className="glass-panel rounded-3xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between space-y-6 overflow-hidden"
              >
                {/* Status indicator pill top-right */}
                <div className="absolute top-6 right-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-primary/10 border border-primary/20 text-primary">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-white/5 text-white/50 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-widest">
                      ID: #{order.id}
                    </span>
                    <h3 className="text-base font-extrabold text-white pt-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {order.timestamp}
                    </h3>
                  </div>

                  {/* Customer Brief summary list */}
                  <div className="space-y-2 text-xs text-on-surface-variant border-t border-b border-white/5 py-4">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-bold text-white">Destinatário:</span> 
                      <span className="line-clamp-1">{order.customer.name}</span>
                    </p>
                    <p className="flex items-center gap-2 pl-5">
                      <span className="text-white/60 font-medium">Modo:</span> 
                      <span>{order.customer.type === "delivery" ? "Entrega residencial" : "Retirar na loja"}</span>
                    </p>
                    {order.customer.type === "delivery" && (
                      <p className="pl-5 text-[11px] font-mono leading-relaxed text-white/40 line-clamp-1">
                        Endereço: {order.customer.address}
                      </p>
                    )}
                    <p className="flex items-center gap-2 pt-1">
                      <Landmark className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-bold text-white">Pagamento:</span> 
                      <span>{order.customer.payment}</span>
                    </p>
                  </div>

                  {/* Items summary */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Itens do Recibo</h4>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto hide-scrollbar">
                      {order.items.map((item) => (
                        <div key={item.cartKey} className="flex justify-between items-center text-xs">
                          <span className="text-white/80">
                            {item.quantity}x {item.emoji} {item.name}
                          </span>
                          <span className="font-bold text-primary">
                            {item.price !== null ? `R$ ${item.price.toFixed(2)}` : "A confirmar"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Receipt Foot Total summary calculations */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Total Pago</span>
                    <span className="text-lg font-black text-primary">
                      {order.total !== null ? `R$ ${order.total.toFixed(2)}` : "A confirmar"}
                    </span>
                  </div>
                  
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    Enviado via WhatsApp
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
