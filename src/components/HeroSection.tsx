import React, { useState, useEffect } from "react";
import { storeInfo } from "../data";
import { Camera } from "lucide-react";

interface HeroSectionProps {
  onVerCardapioClick: () => void;
  isOpen: boolean;
  customImage?: string;
  onUpdateImage?: (base64: string) => void;
  hasCustomImage?: boolean;
  onRemoveImage?: () => void;
}

export default function HeroSection({ 
  onVerCardapioClick, 
  isOpen, 
  customImage, 
  onUpdateImage,
  hasCustomImage,
  onRemoveImage 
}: HeroSectionProps) {
  const displayImage = customImage || "https://i.ibb.co/FLmVXWGs/cardapio-virtual.png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = reader.result as string;
        // Compress image to fit under localStorage limits flawlessly!
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.75);
            onUpdateImage(compressed);
          } else {
            onUpdateImage(base64Str);
          }
        };
        img.onerror = () => {
          onUpdateImage(base64Str);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative w-full h-[540px] flex flex-col justify-end px-4 md:px-8 pb-12 overflow-hidden rounded-3xl mt-2 select-none">
      {/* Background Image with elegant gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[6000ms] hover:scale-100"
          alt="Café & Bistrô interior"
          src={displayImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-bg via-base-bg/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-base-bg/40 to-transparent"></div>
      </div>

      {/* Visual content */}
      <div className="relative z-10 space-y-5 max-w-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            Cardápio Virtual
          </span>

          {isOpen ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Aberto agora
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Fechado no momento
            </div>
          )}
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
          Monte seu pedido de forma rápida e finalize direto pelo <span className="text-primary font-black">WhatsApp.</span>
        </h2>
        
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-normal">
          Selecione suas preferências, monte o carrinho e envie para nós. Entregamos direto na sua residência ou preparamos para retirada!
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={onVerCardapioClick}
            className="w-full md:w-auto px-10 py-4 rounded-full bg-primary-container text-on-primary-container text-lg font-bold transition-all hover:scale-[1.03] active:scale-95 duration-200 cursor-pointer burnt-orange-glow uppercase tracking-wide"
          >
            Ver cardápio
          </button>
        </div>
      </div>
    </section>
  );
}
