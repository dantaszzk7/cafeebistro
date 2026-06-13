import React from "react";
import { Utensils, ShoppingCart, ReceiptText, Info } from "lucide-react";

interface BottomNavBarProps {
  currentTab: "menu" | "cart" | "orders" | "info";
  onTabChange: (tab: "menu" | "cart" | "orders" | "info") => void;
  cartCount: number;
}

interface NavItem {
  id: "menu" | "cart" | "orders" | "info";
  label: string;
  icon: any;
  badge?: boolean;
}

export default function BottomNavBar({
  currentTab,
  onTabChange,
  cartCount
}: BottomNavBarProps) {
  const navItems: NavItem[] = [
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "cart", label: "Carrinho", icon: ShoppingCart, badge: true },
    { id: "orders", label: "Pedidos", icon: ReceiptText },
    { id: "info", label: "Informações", icon: Info }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-4 pt-2 h-20 bg-surface-container/95 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] rounded-t-2xl border-t border-white/5">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentTab === item.id;
        
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`relative flex flex-col items-center justify-center flex-1 h-12 transition-all active:scale-90 duration-250 cursor-pointer ${
              isActive 
                ? "text-primary font-boldScale" 
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            <div className="relative">
              <IconComponent className={`w-6 h-6 mb-0.5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              
              {item.badge && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary-container text-on-primary-container text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs leading-none mt-1 tracking-wide font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
