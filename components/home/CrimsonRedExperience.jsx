"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "../../constants/menu";
import { useAudioController } from "../../hooks/useAudioController";
import { Stage } from "../hero/Stage";
import { PageFrame } from "../layout/PageFrame";

export default function CrimsonRedExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const audio = useAudioController({ reduceMotion });

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % MENU_ITEMS.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      }

      if (event.key === "Escape" && audio.isSoundPanelOpen) {
        event.preventDefault();
        audio.closeSoundPanel();
      }

      if (event.key === "Escape" && isMobileMenuOpen) {
        event.preventDefault();
        setIsMobileMenuOpen(false);
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
  }, [activeIndex, audio, isMobileMenuOpen]);

  return (
    <PageFrame
      reduceMotion={reduceMotion}
      activeIndex={activeIndex}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
      onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      onActivateMenu={setActiveIndex}
      audio={audio}
    >
      <Stage
        activeIndex={activeIndex}
        reduceMotion={reduceMotion}
        onActivateMenu={setActiveIndex}
        onHoverMenuSound={audio.playMenuHoverSound}
      />
    </PageFrame>
  );
}
