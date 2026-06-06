export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const PREFERRED_FOCUS_SELECTOR = [
  '[aria-current="page"]',
  ".is-selected",
  ".is-active",
  '[aria-pressed="true"]',
].join(",");

const TYPING_TAG_NAMES = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function isTypingTarget(target) {
  return target instanceof HTMLElement && (TYPING_TAG_NAMES.has(target.tagName) || target.isContentEditable);
}

export function isVisible(element) {
  const rect = element.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
}

export function getFirstFocusableElement(section) {
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

export function getFocusableElements(section) {
  if (!section || !isVisible(section)) return [];

  return Array.from(section.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => element instanceof HTMLElement && isVisible(element),
  );
}

export function consumeKeyboardEvent(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();
}
