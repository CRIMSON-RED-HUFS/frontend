"use client";

import { useMemo } from "react";
import {
  getMemberMainColumnEntryFocus,
  handleMemberMainColumnKeyDown,
} from "./memberMainColumnKeyboardNavigation";

export function useMemberMainColumnKeyboardNavigation(onNavigateSound) {
  return useMemo(
    () => ({
      getEntryFocus: getMemberMainColumnEntryFocus,
      handleKeyDown: (context) =>
        handleMemberMainColumnKeyDown({
          ...context,
          onNavigateSound,
        }),
    }),
    [onNavigateSound],
  );
}
