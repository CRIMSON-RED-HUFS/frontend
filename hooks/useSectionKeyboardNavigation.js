"use client";

import { useEffect } from "react";
import {
  consumeKeyboardEvent,
  getFirstFocusableElement,
  getFocusableElements,
  isTypingTarget,
  isVisible,
} from "./keyboardNavigationUtils";

export function useSectionKeyboardNavigation({
  disabled = false,
  sections,
  onNavigateSound,
  mainColumn,
}) {
  useEffect(() => {
    function focusElement(element) {
      if (!element) return false;

      element.focus();
      onNavigateSound?.();
      return true;
    }

    function getMainColumnEntryFocus(column) {
      if (mainColumn?.getEntryFocus) {
        return mainColumn.getEntryFocus(column);
      }

      return getFirstFocusableElement(column);
    }

    function getSectionEntryFocus(section) {
      const mainColumnRef = sections[1]?.current;

      if (mainColumnRef === section) {
        return getMainColumnEntryFocus(section);
      }

      return getFirstFocusableElement(section);
    }

    function handleKeyDown(event) {
      if (disabled || isTypingTarget(event.target)) return;

      const isHorizontalNavigation = event.key === "ArrowLeft" || event.key === "ArrowRight";
      const isVerticalNavigation = event.key === "ArrowUp" || event.key === "ArrowDown";
      const isDirectionalNavigation = isHorizontalNavigation || isVerticalNavigation;

      if (!isDirectionalNavigation) return;

      const availableSections = sections
        .map((section) => section.current)
        .filter((section) => section instanceof HTMLElement && isVisible(section));

      if (availableSections.length === 0) return;

      const sidebarSection = availableSections[0];
      const mainColumnSection = sections[1]?.current;
      const menuSection = sections[2]?.current;
      const isMenuVisible = menuSection instanceof HTMLElement && isVisible(menuSection);

      if (sidebarSection?.contains(document.activeElement)) {
        const sidebarSectionIndex = availableSections.indexOf(sidebarSection);

        if (event.key === "ArrowRight") {
          const nextSection = availableSections[sidebarSectionIndex + 1];
          const nextElement = getSectionEntryFocus(nextSection);
          if (!nextElement) return;

          consumeKeyboardEvent(event);
          focusElement(nextElement);
          return;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft") {
          const buttons = getFocusableElements(sidebarSection);
          if (buttons.length === 0) return;

          const currentIndex = buttons.findIndex((button) => button === document.activeElement);
          const direction = event.key === "ArrowDown" ? 1 : -1;
          const nextIndex =
            currentIndex === -1
              ? direction === 1
                ? 0
                : buttons.length - 1
              : (currentIndex + direction + buttons.length) % buttons.length;

          consumeKeyboardEvent(event);
          focusElement(buttons[nextIndex]);
          return;
        }

        return;
      }

      if (mainColumnSection?.contains(document.activeElement)) {
        if (
          mainColumn?.handleKeyDown?.({
            availableSections,
            consumeKeyboardEvent,
            event,
            filterSection: sidebarSection,
            focusElement,
            getSectionEntryFocus,
            isHorizontalNavigation,
            isMenuVisible,
            mainColumn: mainColumnSection,
            menuSection,
          })
        ) {
          return;
        }
      }

      if (!isHorizontalNavigation) return;

      const currentIndex = availableSections.findIndex((section) => section.contains(document.activeElement));
      const nextIndex =
        currentIndex === -1
          ? event.key === "ArrowRight"
            ? 0
            : availableSections.length - 1
          : currentIndex + (event.key === "ArrowRight" ? 1 : -1);

      if (nextIndex < 0 || nextIndex >= availableSections.length) return;

      const nextElement = getSectionEntryFocus(availableSections[nextIndex]);
      if (!nextElement) return;

      consumeKeyboardEvent(event);
      focusElement(nextElement);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, mainColumn, onNavigateSound, sections]);
}
