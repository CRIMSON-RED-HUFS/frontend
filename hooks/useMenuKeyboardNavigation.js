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
  menuScopeRef,
  onNavigateSound,
  onActiveIndexChange,
  onCloseSoundPanel,
  onMobileMenuOpenChange,
}) {
  useEffect(() => {
    function isMenuInteractionTarget() {
      if (isMobileMenuOpen) return true;

      const menuScope = menuScopeRef?.current;
      if (!menuScope) return true;

      const activeElement = document.activeElement;

      return (
        !activeElement ||
        activeElement === document.body ||
        activeElement === document.documentElement ||
        menuScope.contains(activeElement)
      );
    }

    function focusMenuItem(index) {
      const scope = isMobileMenuOpen ? ".mobile-menu-panel" : ".desktop-menu";
      const item = document.querySelector(`${scope} [data-menu-index="${index}"]`);

      if (item instanceof HTMLElement) {
        item.focus();
      }
    }

    function handleKeyDown(event) {
      if (event.defaultPrevented) return;
      if (isTypingTarget(event.target)) return;

      if (event.key === "ArrowDown") {
        if (!isMenuInteractionTarget()) return;
        event.preventDefault();
        onNavigateSound?.();
        const nextIndex = (activeIndex + 1) % MENU_ITEMS.length;
        onActiveIndexChange(nextIndex);
        focusMenuItem(nextIndex);
      }

      if (event.key === "ArrowUp") {
        if (!isMenuInteractionTarget()) return;
        event.preventDefault();
        onNavigateSound?.();
        const nextIndex = (activeIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
        onActiveIndexChange(nextIndex);
        focusMenuItem(nextIndex);
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
        if (!isMenuInteractionTarget()) return;
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
    menuScopeRef,
    onActiveIndexChange,
    onCloseSoundPanel,
    onMobileMenuOpenChange,
    onNavigateSound,
  ]);
}
