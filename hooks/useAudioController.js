"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AUDIO,
  BGM_TRACKS,
  DEFAULT_BGM_LEVEL,
  DEFAULT_BGM_TRACK_ID,
  DEFAULT_SFX_LEVEL,
} from "../constants/audio";

function getBgmTrack(trackId) {
  return BGM_TRACKS.find((track) => track.id === trackId) ?? BGM_TRACKS[0];
}

function getNextBgmTrack(trackId) {
  const currentIndex = BGM_TRACKS.findIndex((track) => track.id === trackId);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % BGM_TRACKS.length;

  return BGM_TRACKS[nextIndex];
}

export function useAudioController({ reduceMotion }) {
  const [isSoundPanelOpen, setIsSoundPanelOpen] = useState(false);
  const [bgmLevel, setBgmLevel] = useState(DEFAULT_BGM_LEVEL);
  const [sfxLevel, setSfxLevel] = useState(DEFAULT_SFX_LEVEL);
  const [activeBgmTrackId, setActiveBgmTrackId] = useState(DEFAULT_BGM_TRACK_ID);
  const [isMutedAll, setIsMutedAll] = useState(false);
  const hoverAudioRef = useRef(null);
  const bgmAudioRef = useRef(null);
  const bgmLevelRef = useRef(DEFAULT_BGM_LEVEL);
  const sfxLevelRef = useRef(DEFAULT_SFX_LEVEL);
  const activeBgmTrackIdRef = useRef(DEFAULT_BGM_TRACK_ID);
  const muteSnapshotRef = useRef(null);
  const audioUnlockedRef = useRef(false);

  useEffect(() => {
    hoverAudioRef.current = new Audio(AUDIO.menuHover);
    hoverAudioRef.current.preload = "auto";

    const bgm = new Audio(getBgmTrack(DEFAULT_BGM_TRACK_ID).src);
    bgm.preload = "auto";
    bgm.loop = false;
    bgm.volume = DEFAULT_BGM_LEVEL / 100;

    function handleBgmEnded() {
      const nextTrack = getNextBgmTrack(activeBgmTrackIdRef.current);

      activeBgmTrackIdRef.current = nextTrack.id;
      setActiveBgmTrackId(nextTrack.id);
      bgm.src = nextTrack.src;
      bgm.currentTime = 0;
      bgm.load();

      if (bgmLevelRef.current > 0) {
        void bgm.play().catch(() => {});
      }
    }

    bgm.addEventListener("ended", handleBgmEnded);
    bgmAudioRef.current = bgm;

    return () => {
      bgm.removeEventListener("ended", handleBgmEnded);
      bgm.pause();
      hoverAudioRef.current = null;
      bgmAudioRef.current = null;
    };
  }, []);

  const applyBgmLevel = useCallback((level) => {
    const bgm = bgmAudioRef.current;
    if (!bgm) return;

    bgmLevelRef.current = level;
    setBgmLevel(level);
    bgm.loop = false;
    bgm.volume = level / 100;

    if (level === 0) {
      bgm.pause();
      return;
    }

    if (bgm.ended) {
      bgm.currentTime = 0;
    }

    void bgm.play().catch(() => {});
  }, []);

  const clearMuteSnapshot = useCallback(() => {
    if (!muteSnapshotRef.current) return;

    muteSnapshotRef.current = null;
    setIsMutedAll(false);
  }, []);

  const applySfxLevel = useCallback((level) => {
    sfxLevelRef.current = level;
    setSfxLevel(level);
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) {
      if (bgmLevelRef.current > 0) {
        const bgm = bgmAudioRef.current;
        if (bgm) void bgm.play().catch(() => {});
      }
      return;
    }

    audioUnlockedRef.current = true;

    const hover = hoverAudioRef.current;
    if (hover) {
      const prevVolume = hover.volume;
      hover.volume = 0;
      void hover
        .play()
        .then(() => {
          hover.pause();
          hover.currentTime = 0;
          hover.volume = prevVolume;
        })
        .catch(() => {
          hover.volume = prevVolume;
        });
    }

    if (bgmLevelRef.current > 0) {
      const bgm = bgmAudioRef.current;
      if (bgm) void bgm.play().catch(() => {});
    }
  }, []);

  const openSoundPanel = useCallback(() => {
    unlockAudio();
    setIsSoundPanelOpen(true);
  }, [unlockAudio]);

  const closeSoundPanel = useCallback(() => {
    setIsSoundPanelOpen(false);
  }, []);

  const handleBgmChange = useCallback(
    (level) => {
      unlockAudio();
      clearMuteSnapshot();
      applyBgmLevel(level);
    },
    [applyBgmLevel, clearMuteSnapshot, unlockAudio],
  );

  const handleSfxChange = useCallback(
    (level) => {
      unlockAudio();
      clearMuteSnapshot();
      applySfxLevel(level);
    },
    [applySfxLevel, clearMuteSnapshot, unlockAudio],
  );

  const handleBgmTrackChange = useCallback(
    (trackId) => {
      const nextTrack = getBgmTrack(trackId);
      const bgm = bgmAudioRef.current;

      unlockAudio();
      activeBgmTrackIdRef.current = nextTrack.id;
      setActiveBgmTrackId(nextTrack.id);

      if (!bgm) return;

      bgm.pause();
      bgm.src = nextTrack.src;
      bgm.currentTime = 0;
      bgm.loop = false;
      bgm.volume = bgmLevelRef.current / 100;
      bgm.load();

      if (bgmLevelRef.current > 0) {
        void bgm.play().catch(() => {});
      }
    },
    [unlockAudio],
  );

  const handleMuteAll = useCallback(() => {
    if (isMutedAll && muteSnapshotRef.current) {
      const { bgm, sfx } = muteSnapshotRef.current;
      muteSnapshotRef.current = null;
      setIsMutedAll(false);
      unlockAudio();
      applyBgmLevel(bgm);
      applySfxLevel(sfx);
      return;
    }

    muteSnapshotRef.current = {
      bgm: bgmLevelRef.current,
      sfx: sfxLevelRef.current,
    };
    setIsMutedAll(true);
    applyBgmLevel(0);
    applySfxLevel(0);
  }, [applyBgmLevel, applySfxLevel, isMutedAll, unlockAudio]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    function handleFirstInteraction() {
      unlockAudio();
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [reduceMotion, unlockAudio]);

  useEffect(() => {
    if (!isSoundPanelOpen) return undefined;

    const mobileQuery = window.matchMedia("(max-width: 820px)");
    if (!mobileQuery.matches) return undefined;

    const scrollY = window.scrollY;
    document.documentElement.classList.add("sound-panel-scroll-lock");
    document.body.classList.add("sound-panel-scroll-lock");
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.documentElement.classList.remove("sound-panel-scroll-lock");
      document.body.classList.remove("sound-panel-scroll-lock");
      document.body.style.top = "";
    };
  }, [isSoundPanelOpen]);

  const playMenuHoverSound = useCallback(() => {
    const level = sfxLevelRef.current;
    if (level === 0) return;

    const template = hoverAudioRef.current;
    if (!template) return;

    const audio = template.cloneNode(true);
    audio.volume = level / 100;
    void audio.play().catch(() => {});
  }, []);

  return useMemo(
    () => ({
      bgmLevel,
      bgmTracks: BGM_TRACKS,
      activeBgmTrackId,
      sfxLevel,
      isMutedAll,
      isSoundPanelOpen,
      openSoundPanel,
      closeSoundPanel,
      handleBgmChange,
      handleBgmTrackChange,
      handleSfxChange,
      handleMuteAll,
      playMenuHoverSound,
    }),
    [
      bgmLevel,
      activeBgmTrackId,
      closeSoundPanel,
      handleBgmChange,
      handleBgmTrackChange,
      handleMuteAll,
      handleSfxChange,
      isMutedAll,
      isSoundPanelOpen,
      openSoundPanel,
      playMenuHoverSound,
      sfxLevel,
    ],
  );
}
