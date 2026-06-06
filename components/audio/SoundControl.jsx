"use client";

import { AnimatePresence } from "framer-motion";
import { SoundSystemPanel } from "./SoundSystemPanel";

export function SoundControl({
  isOpen,
  reduceMotion,
  bgmLevel,
  bgmTracks,
  activeBgmTrackId,
  sfxLevel,
  isMutedAll,
  onBgmChange,
  onBgmTrackChange,
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
          bgmTracks={bgmTracks}
          activeBgmTrackId={activeBgmTrackId}
          sfxLevel={sfxLevel}
          isMutedAll={isMutedAll}
          onBgmChange={onBgmChange}
          onBgmTrackChange={onBgmTrackChange}
          onSfxChange={onSfxChange}
          onMuteAll={onMuteAll}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
