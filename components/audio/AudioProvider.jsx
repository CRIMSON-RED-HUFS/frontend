"use client";

import { createContext, useContext } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudioController } from "../../hooks/useAudioController";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const reduceMotion = useReducedMotion();
  const audio = useAudioController({ reduceMotion });

  return <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const audio = useContext(AudioContext);

  if (!audio) {
    throw new Error("useAudio must be used inside AudioProvider.");
  }

  return audio;
}
