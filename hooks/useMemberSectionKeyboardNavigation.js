"use client";

import { useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");
const PREFERRED_FOCUS_SELECTOR = [
  '[aria-current="page"]',
  ".is-selected",
  ".is-active",
  '[aria-pressed="true"]',
].join(",");
const TYPING_TAG_NAMES = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTypingTarget(target) {
  return target instanceof HTMLElement && (TYPING_TAG_NAMES.has(target.tagName) || target.isContentEditable);
}

function isVisible(element) {
  const rect = element.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
}

function getFirstFocusableElement(section) {
  if (!section || !isVisible(section)) return null;

  const preferred = section.querySelector(PREFERRED_FOCUS_SELECTOR);
  if (preferred instanceof HTMLElement && preferred.matches(FOCUSABLE_SELECTOR) && isVisible(preferred)) {
    return preferred;
  }

  const focusable = section.matches(FOCUSABLE_SELECTOR)
    ? section
    : section.querySelector(FOCUSABLE_SELECTOR);

  return focusable instanceof HTMLElement && isVisible(focusable) ? focusable : null;
}

function getFocusableElements(section) {
  if (!section || !isVisible(section)) return [];

  return Array.from(section.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => element instanceof HTMLElement && isVisible(element),
  );
}

function getFeaturedFlip(mainColumn) {
  const flip = mainColumn.querySelector(".featured-member-flip");

  return flip instanceof HTMLElement && isVisible(flip) ? flip : null;
}

function getMemberCards(mainColumn) {
  const grid = mainColumn.querySelector(".member-card-grid");
  if (!grid) return [];

  return Array.from(grid.querySelectorAll(".member-card")).filter(
    (element) => element instanceof HTMLElement && isVisible(element),
  );
}

function getMainColumnEntryFocus(mainColumn) {
  const flip = getFeaturedFlip(mainColumn);
  if (flip) return flip;

  const cards = getMemberCards(mainColumn);
  const selectedCard = cards.find((card) => card.classList.contains("is-selected"));

  return selectedCard ?? cards[0] ?? null;
}

function getSectionEntryFocus(section, sectionRefs) {
  if (sectionRefs[1]?.current === section) {
    return getMainColumnEntryFocus(section);
  }

  return getFirstFocusableElement(section);
}

function getCardCarouselState(mainColumn) {
  const carousel = mainColumn.querySelector(".member-card-carousel");

  return {
    canGoPrev: carousel?.dataset.canGoPrev === "true",
    canGoNext: carousel?.dataset.canGoNext === "true",
  };
}

function getCardGlobalState(card) {
  const globalIndex = Number(card.dataset.globalIndex);
  const memberCount = Number(card.dataset.memberCount);

  return {
    globalIndex,
    memberCount,
    isFirstMember: globalIndex === 0,
    isLastMember: globalIndex === memberCount - 1,
  };
}

function focusAfterPageChange(mainColumn, position) {
  window.setTimeout(() => {
    const cards = getMemberCards(mainColumn);
    const target = position === "first" ? cards[0] : cards[cards.length - 1];
    target?.focus();
  }, 340);
}

function consumeKeyboardEvent(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();
}

export function useMemberSectionKeyboardNavigation({ disabled = false, sections, onNavigateSound }) {
  useEffect(() => {
    function focusElement(element) {
      if (!element) return false;

      element.focus();
      onNavigateSound?.();
      return true;
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

      const filterSection = availableSections[0];
      const mainColumn = sections[1]?.current;
      const menuSection = sections[2]?.current;
      const isMenuVisible = menuSection instanceof HTMLElement && isVisible(menuSection);

      if (filterSection?.contains(document.activeElement)) {
        const filterSectionIndex = availableSections.indexOf(filterSection);

        if (event.key === "ArrowRight") {
          const nextSection = availableSections[filterSectionIndex + 1];
          const nextElement = getSectionEntryFocus(nextSection, sections);
          if (!nextElement) return;

          consumeKeyboardEvent(event);
          focusElement(nextElement);
          return;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft") {
          const buttons = getFocusableElements(filterSection);
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

      if (mainColumn?.contains(document.activeElement)) {
        const flip = getFeaturedFlip(mainColumn);
        const cards = getMemberCards(mainColumn);
        const activeElement = document.activeElement;
        const activeCardIndex = cards.indexOf(activeElement);
        const isOnFlip = activeElement === flip;
        const isOnCard = activeCardIndex !== -1;

        if (event.key === "ArrowDown" && isOnFlip && cards.length > 0) {
          const target = cards.find((card) => card.classList.contains("is-selected")) ?? cards[0];

          consumeKeyboardEvent(event);
          focusElement(target);
          return;
        }

        if (event.key === "ArrowUp" && isOnCard && flip) {
          consumeKeyboardEvent(event);
          focusElement(flip);
          return;
        }

        if (isOnCard && isHorizontalNavigation) {
          if (event.key === "ArrowRight" && activeCardIndex < cards.length - 1) {
            consumeKeyboardEvent(event);
            focusElement(cards[activeCardIndex + 1]);
            return;
          }

          if (event.key === "ArrowLeft" && activeCardIndex > 0) {
            consumeKeyboardEvent(event);
            focusElement(cards[activeCardIndex - 1]);
            return;
          }

          if (event.key === "ArrowRight" && activeCardIndex === cards.length - 1) {
            const { canGoNext } = getCardCarouselState(mainColumn);
            const { isLastMember } = getCardGlobalState(activeElement);

            if (canGoNext) {
              const nextPageButton = mainColumn.querySelector(".member-card-arrow-next");
              if (nextPageButton instanceof HTMLElement) {
                consumeKeyboardEvent(event);
                nextPageButton.click();
                focusAfterPageChange(mainColumn, "first");
                onNavigateSound?.();
                return;
              }
            }

            if (isLastMember && isMenuVisible) {
              const nextElement = getFirstFocusableElement(menuSection);
              if (nextElement) {
                consumeKeyboardEvent(event);
                focusElement(nextElement);
                return;
              }
            }

            return;
          }

          if (event.key === "ArrowLeft" && activeCardIndex === 0) {
            const { canGoPrev } = getCardCarouselState(mainColumn);
            const { isFirstMember } = getCardGlobalState(activeElement);

            if (canGoPrev) {
              const prevPageButton = mainColumn.querySelector(".member-card-arrow-prev");
              if (prevPageButton instanceof HTMLElement) {
                consumeKeyboardEvent(event);
                prevPageButton.click();
                focusAfterPageChange(mainColumn, "last");
                onNavigateSound?.();
                return;
              }
            }

            if (isFirstMember) {
              const nextElement = getFirstFocusableElement(filterSection);
              if (nextElement) {
                consumeKeyboardEvent(event);
                focusElement(nextElement);
                return;
              }
            }

            return;
          }
        }

        if (isOnFlip && isHorizontalNavigation) {
          const currentIndex = availableSections.indexOf(mainColumn);
          const nextIndex = currentIndex + (event.key === "ArrowRight" ? 1 : -1);

          if (nextIndex < 0 || nextIndex >= availableSections.length) return;

          const nextElement = getSectionEntryFocus(availableSections[nextIndex], sections);
          if (!nextElement) return;

          consumeKeyboardEvent(event);
          focusElement(nextElement);
          return;
        }

        if (isOnFlip || isOnCard) return;
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

      const nextElement = getSectionEntryFocus(availableSections[nextIndex], sections);
      if (!nextElement) return;

      consumeKeyboardEvent(event);
      focusElement(nextElement);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onNavigateSound, sections]);
}
