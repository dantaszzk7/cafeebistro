import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export default function SuccessToast({ message, isVisible, onHide }: SuccessToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[150] pointer-events-none transition-all duration-300 ${
      isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 -translate-y-6"
    }`}>
      <div className="bg-primary-container text-on-primary-container px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-primary/20 select-none">
        <CheckCircle className="w-5 h-5 text-primary shrink-0 stroke-[2.5]" />
        <span className="font-bold text-sm tracking-wide leading-none">{message}</span>
      </div>
    </div>
  );
}
