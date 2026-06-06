import { getFirstFocusableElement, isVisible } from "./keyboardNavigationUtils";

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

export function getMemberMainColumnEntryFocus(mainColumn) {
  const flip = getFeaturedFlip(mainColumn);
  if (flip) return flip;

  const cards = getMemberCards(mainColumn);
  const selectedCard = cards.find((card) => card.classList.contains("is-selected"));

  return selectedCard ?? cards[0] ?? getFirstFocusableElement(mainColumn);
}

export function handleMemberMainColumnKeyDown({
  availableSections,
  consumeKeyboardEvent,
  event,
  filterSection,
  focusElement,
  getSectionEntryFocus,
  isHorizontalNavigation,
  isMenuVisible,
  mainColumn,
  menuSection,
  onNavigateSound,
}) {
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
    return true;
  }

  if (event.key === "ArrowUp" && isOnCard && flip) {
    consumeKeyboardEvent(event);
    focusElement(flip);
    return true;
  }

  if (isOnCard && isHorizontalNavigation) {
    if (event.key === "ArrowRight" && activeCardIndex < cards.length - 1) {
      consumeKeyboardEvent(event);
      focusElement(cards[activeCardIndex + 1]);
      return true;
    }

    if (event.key === "ArrowLeft" && activeCardIndex > 0) {
      consumeKeyboardEvent(event);
      focusElement(cards[activeCardIndex - 1]);
      return true;
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
          return true;
        }
      }

      if (isLastMember && isMenuVisible) {
        const nextElement = getFirstFocusableElement(menuSection);
        if (nextElement) {
          consumeKeyboardEvent(event);
          focusElement(nextElement);
          return true;
        }
      }

      return true;
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
          return true;
        }
      }

      if (isFirstMember) {
        const nextElement = getFirstFocusableElement(filterSection);
        if (nextElement) {
          consumeKeyboardEvent(event);
          focusElement(nextElement);
          return true;
        }
      }

      return true;
    }
  }

  if (isOnFlip && isHorizontalNavigation) {
    const currentIndex = availableSections.indexOf(mainColumn);
    const nextIndex = currentIndex + (event.key === "ArrowRight" ? 1 : -1);

    if (nextIndex < 0 || nextIndex >= availableSections.length) return true;

    const nextElement = getSectionEntryFocus(availableSections[nextIndex]);
    if (!nextElement) return true;

    consumeKeyboardEvent(event);
    focusElement(nextElement);
    return true;
  }

  if (isOnFlip || isOnCard) {
    return true;
  }

  return false;
}
