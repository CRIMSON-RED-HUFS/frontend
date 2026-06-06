"use client";

import { useCallback, useState } from "react";
import { MENU_ITEMS } from "../constants/menu";

export function usePageShellNavigation({ menuHref }) {
  const defaultIndex = Math.max(
    MENU_ITEMS.findIndex((item) => item.href === menuHref),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((open) => !open);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
