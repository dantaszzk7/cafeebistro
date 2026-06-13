import React from "react";
import { Clock, MapPin, Phone, Instagram, ChevronRight } from "lucide-react";
import { storeInfo } from "../data";

export default function BentoGrid() {
  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${storeInfo.whatsappNumber}`, "_blank");
  };

  const handleInstagramClick = () => {
    window.open(storeInfo.instagramUrl, "_blank");
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeInfo.address)}`;

  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
      {/* Horário de Atendimento Card */}
      <div className="bento-card p-6 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[200px]">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
          <Clock className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Horário de Atendimento</h3>
          <p className="text-on-surface-variant text-base">
            {storeInfo.openingText}
          </p>
        </div>
      </div>

      {/* Onde estamos Card */}
      <a 
        href={mapSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bento-card p-6 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[200px] hover:border-primary/20 transition-all group"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
          <MapPin className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white mb-1">Onde estamos</h3>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-on-surface-variant text-base">
            {storeInfo.address}
          </p>
        </div>
      </a>

      {/* Nossas Redes Card */}
      <div className="bento-card p-6 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[200px] gap-6">
        <h3 className="text-xl font-bold text-white">Nossas Redes</h3>
        <div className="flex flex-col gap-3">
          {/* WhatsApp link */}
          <button
            type="button"
            onClick={handleWhatsappClick}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left w-full cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <Phone className="w-4 h-4 fill-green-400/10" />
              </div>
              <span className="text-sm font-semibold text-white">
                {storeInfo.whatsappDisplay}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Instagram link */}
          <button
            type="button"
            onClick={handleInstagramClick}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left w-full cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-white">
                {storeInfo.instagramUser}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
