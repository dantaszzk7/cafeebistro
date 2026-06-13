import React from "react";
import { storeInfo } from "../data";
import { Clock, MapPin, Phone, Instagram, ShieldAlert, Coins, HelpCircle } from "lucide-react";

export default function InfoSection() {
  const handleWhatsappCall = () => {
    window.open(`https://wa.me/${storeInfo.whatsappNumber}`, "_blank");
  };

  const handleInstagramClick = () => {
    window.open(storeInfo.instagramUrl, "_blank");
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeInfo.address)}`;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 select-none">
      {/* View Title */}
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Sobre Nós & Contato</h2>
        <p className="text-sm text-on-surface-variant">
          Conheça nosso compromisso de hospitalidade e canais de contato.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Restaurant Profile summary cards */}
        <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">{storeInfo.name}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Hospitalidade artesanal desde 2024. Experiência gastronômica premium em cada detalhe. Nossa cozinha seleciona carnes nobres e prepara cafés impecáveis com um toque de afeto e grãos nobres selecionados.
            </p>
          </div>

          {/* Business Details items inside lists */}
          <div className="space-y-4">
            {/* Clock Hours */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Horário de Atendimento</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Atendimento oficial e despacho das propostas comerciais. <br />
                  <span className="font-bold text-white pr-1.5">•</span> {storeInfo.openingText}
                </p>
              </div>
            </div>

            {/* Address maps direction cards */}
            <a 
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all block text-left"
            >
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-white">Nosso Endereço</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Ponto de referência principal comercial da nossa recepção. <br />
                  <span className="font-bold text-white pr-1.5">•</span> {storeInfo.address}
                </p>
                <div className="inline-block mt-2 text-[10px] text-primary font-bold uppercase tracking-wider underline">
                  Abrir no Google Maps ↗
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Contact and Safety warning disclaimers list */}
        <div className="space-y-6">
          
          {/* Quick Contact buttons cards */}
          <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white">Canais de Contato</h3>
            <p className="text-xs text-on-surface-variant">
              Fale conosco direto com nossa gerência ou tire suas dúvidas sobre pedidos.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleWhatsappCall}
                className="py-4 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30 text-green-400 font-bold text-sm transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
                <span className="text-[10px] text-green-400/70 font-medium">{storeInfo.whatsappDisplay}</span>
              </button>

              <button
                type="button"
                onClick={handleInstagramClick}
                className="py-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/30 text-pink-400 font-bold text-sm transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
                <span className="text-[10px] text-pink-400/70 font-medium">{storeInfo.instagramUser}</span>
              </button>
            </div>
          </div>

          {/* Coins payments summary card info */}
          <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-4 h-4 text-primary" />
              Pagamentos e Termos
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Aceitamos múltiplos meios de pagamento inclusive Pix, Cartões de Crédito e Débito. <br />
              Seu faturamento de Pix será validado com CNPJ oficial cadastrado: <br />
              <span className="font-mono text-primary font-bold block pt-1 select-all">{storeInfo.pix}</span>
            </p>
          </div>

          {/* Safety disclaimer callout warning */}
          <div className="p-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-on-surface-variant shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-white">Aviso Comercial:</span> Pedidos realizados fora do horário comercial ({storeInfo.openingText}) serão processados no próximo dia útil da semana. Agradecemos imensamente a sua compreensão e bom apetite!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
