"use client";

import { AnimatePresence } from "framer-motion";
import { SoundSystemPanel } from "./SoundSystemPanel";

export function SoundControl({
  isOpen,
  reduceMotion,
  bgmLevel,
  sfxLevel,
  isMutedAll,
  onBgmChange,
  onSfxChange,
  onMuteAll,
  onClose,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <SoundSystemPanel
          reduceMotion={reduceMotion}
          bgmLevel={bgmLevel}
          sfxLevel={sfxLevel}
          isMutedAll={isMutedAll}
          onBgmChange={onBgmChange}
          onSfxChange={onSfxChange}
          onMuteAll={onMuteAll}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

