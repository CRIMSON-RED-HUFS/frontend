"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudioController } from "../../hooks/useAudioController";
import { useMenuKeyboardNavigation } from "../../hooks/useMenuKeyboardNavigation";
import { Stage } from "../hero/Stage";
import { PageFrame } from "../layout/PageFrame";

export default function CrimsonRedExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const audio = useAudioController({ reduceMotion });

  useMenuKeyboardNavigation({
    activeIndex,
    isMobileMenuOpen,
    isSoundPanelOpen: audio.isSoundPanelOpen,
    onActiveIndexChange: setActiveIndex,
    onCloseSoundPanel: audio.closeSoundPanel,
    onMobileMenuOpenChange: setIsMobileMenuOpen,
    onNavigateSound: audio.playMenuHoverSound,
  });

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
