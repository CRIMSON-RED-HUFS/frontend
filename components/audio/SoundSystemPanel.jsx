"use client";

import { motion } from "framer-motion";
import { BgmIcon, CloseIcon, SfxIcon } from "../icons/Icons";
import { SoundTrack } from "./SoundTrack";

export function SoundSystemPanel({
  reduceMotion,
  bgmLevel,
  bgmTracks = [],
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
    <>
      <motion.button
        key="sound-backdrop"
        className="sound-backdrop"
        type="button"
        aria-label="Close sound system"
        onClick={onClose}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? {} : { opacity: 1 }}
        exit={reduceMotion ? {} : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        key="sound-hub"
        className="sound-system-hub"
        style={{ transformOrigin: "var(--sound-hub-origin, bottom right)" }}
        initial={reduceMotion ? false : { opacity: 0, x: 0, y: 24, scale: 0.94 }}
        animate={reduceMotion ? {} : { opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={reduceMotion ? {} : { opacity: 0, x: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <aside className="sound-panel" role="dialog" aria-modal="true" aria-labelledby="sound-panel-title">
          <div className="sound-panel-top">
            <div className="sound-panel-titleblock">
              <p className="sound-panel-kicker">AUDIO CONTROL</p>
              <h2 id="sound-panel-title">SOUND SYSTEM</h2>
            </div>
            <button className="sound-close" type="button" aria-label="Close sound system" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="sound-tracks">
            <SoundTrack id="bgm-level" label="BGM" icon={<BgmIcon />} value={bgmLevel} onChange={onBgmChange} />
            <SoundTrack id="sfx-level" label="SFX" icon={<SfxIcon />} value={sfxLevel} onChange={onSfxChange} />
          </div>

          <div className="sound-playlist" aria-label="BGM track select">
            <div className="sound-playlist-head">
              <span className="sound-playlist-label">TRACK SELECT</span>
              <span className="sound-playlist-count">{bgmTracks.length.toString().padStart(2, "0")}</span>
            </div>
            <div className="sound-playlist-options">
              {bgmTracks.map((track, index) => {
                const isActive = track.id === activeBgmTrackId;

                return (
                  <button
                    key={track.id}
                    className={["sound-track-option", isActive ? "is-active" : ""].filter(Boolean).join(" ")}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onBgmTrackChange(track.id)}
                  >
                    <span className="sound-track-option-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="sound-track-option-title">{track.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sound-panel-bottom">
            <div className="sound-panel-actions">
              <button className="sound-action sound-action-primary" type="button" onClick={onMuteAll}>
                {isMutedAll ? "UNMUTE ALL" : "MUTE ALL"}
              </button>
              <button className="sound-action sound-action-ghost" type="button" onClick={onClose}>
                CLOSE
              </button>
            </div>
          </div>
        </aside>

        <svg className="sound-link" viewBox="0 0 120 88" aria-hidden="true" focusable="false">
          <path className="sound-link-path" d="M8 8 L8 52 L108 78" />
          <circle className="sound-link-node" cx="108" cy="78" r="4" />
        </svg>
      </motion.div>
    </>
  );
}
