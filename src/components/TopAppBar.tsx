import React from "react";
import { Menu, ShoppingBag } from "lucide-react";

interface TopAppBarProps {
  onMenuClick?: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export default function TopAppBar({ onMenuClick, onCartClick, cartCount }: TopAppBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-base-bg/85 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button 
            type="button"
            onClick={onMenuClick}
            className="p-1 text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer"
            id="menu-trigger"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="font-sans text-2xl font-extrabold tracking-tight text-primary">
          Café & Bistrô
        </h1>
      </div>
      
      <div>
        <button
          type="button"
          onClick={onCartClick}
          className="relative p-2 text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer"
          id="cart-trigger"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold tracking-tight animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
