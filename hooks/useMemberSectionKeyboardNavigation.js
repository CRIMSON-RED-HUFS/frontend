"use client";

import { useMemberMainColumnKeyboardNavigation } from "./useMemberMainColumnKeyboardNavigation";
import { useSectionKeyboardNavigation } from "./useSectionKeyboardNavigation";

/** Composes generic section navigation with members main-column handlers. */
export function useMemberSectionKeyboardNavigation({ disabled = false, sections, onNavigateSound }) {
  const mainColumn = useMemberMainColumnKeyboardNavigation(onNavigateSound);

  useSectionKeyboardNavigation({
    disabled,
    mainColumn,
    onNavigateSound,
    sections,
  });
}
