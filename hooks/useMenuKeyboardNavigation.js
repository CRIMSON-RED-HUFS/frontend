"use client";

import { useEffect } from "react";
import { MENU_ITEMS } from "../constants/menu";

const TYPING_TAG_NAMES = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTypingTarget(target) {
  return target instanceof HTMLElement && (TYPING_TAG_NAMES.has(target.tagName) || target.isContentEditable);
}

export function useMenuKeyboardNavigation({
  activeIndex,
  isMobileMenuOpen,
  isSoundPanelOpen,
  onActiveIndexChange,
  onCloseSoundPanel,
  onMobileMenuOpenChange,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (isTypingTarget(event.target)) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        onActiveIndexChange((index) => (index + 1) % MENU_ITEMS.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        onActiveIndexChange((index) => (index - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      }

      if (event.key === "Escape" && isSoundPanelOpen) {
        event.preventDefault();
        onCloseSoundPanel();
      }

      if (event.key === "Escape" && isMobileMenuOpen) {
        event.preventDefault();
        onMobileMenuOpenChange(false);
      }

      if (event.key === "Enter") {
        const scope = isMobileMenuOpen ? ".mobile-menu-panel" : ".desktop-menu";
        const item = document.querySelector(`${scope} [data-menu-index="${activeIndex}"]`);

        if (item) {
          event.preventDefault();
          item.click();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeIndex,
    isMobileMenuOpen,
    isSoundPanelOpen,
    onActiveIndexChange,
    onCloseSoundPanel,
    onMobileMenuOpenChange,
  ]);
}
