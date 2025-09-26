import { useState } from "react";

// OPZIONE: Hook specifico per Radix con controllo esterno
export function useRadixOverlay(initialOpen = false) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    
    return {
      isOpen,
      onOpenChange: setIsOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev)
    };
  }
  