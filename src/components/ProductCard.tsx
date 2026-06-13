import React from "react";
import { Product } from "../types";
import { Plus } from "lucide-react";

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddClick: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onAddClick 
}: ProductCardProps) {
  const isPendingPrice = product.price === null;
  const hasVariants = product.variants && product.variants.length > 0;

  const getDisplayPrice = () => {
    if (hasVariants) {
      const minPrice = Math.min(
        ...product.variants
          .map((v) => v.price)
          .filter((p): p is number => p !== null)
      );
      return `A partir de R$ ${minPrice.toFixed(2)}`;
    }
    if (isPendingPrice) {
      return "Preço a confirmar";
    }
    return `R$ ${product.price!.toFixed(2)}`;
  };

  const hasConfig = 
    (product.variants && product.variants.length > 0) ||
    (product.addons && product.addons.length > 0) ||
    (product.customFields && product.customFields.length > 0);

  return (
    <div className="bg-surface-container-low rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 border border-white/5 hover:border-primary/20 hover:scale-[1.01] hover:shadow-xl">
      {/* Product Image Stage */}
      <div className="relative h-56 overflow-hidden bg-surface-container-high">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Replace with fallback background if load fails
            e.currentTarget.src = "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80";
          }}
        />

        {/* Status Chip */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
          <span className={product.available ? "text-primary" : "text-red-400"}>
            {product.available ? "Disponível" : "Esgotado"}
          </span>
        </div>

        {/* Price tag on top of image when available */}
        {!isPendingPrice && !hasVariants && (
          <div className="absolute bottom-4 right-4 bg-base-bg/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-primary font-bold text-sm border border-white/5 shadow-md">
            R$ {product.price!.toFixed(2)}
          </div>
        )}
      </div>

      {/* Product Content info */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <span>{product.emoji}</span>
            {product.name}
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {hasConfig && (
            <span className="inline-block pt-1.5 text-[11px] text-primary/80 font-bold uppercase tracking-wider">
              ✦ Customizável
            </span>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest font-bold">
              Valor
            </span>
            <span className={`text-base font-bold ${isPendingPrice ? "text-on-surface-variant/80 font-medium" : "text-white"}`}>
              {getDisplayPrice()}
            </span>
          </div>

          <button
            type="button"
            disabled={!product.available}
            onClick={() => onAddClick(product)}
            className={`h-11 px-6 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
              product.available
                ? "bg-primary-container text-on-primary-container hover:scale-[1.03]"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            }`}
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
