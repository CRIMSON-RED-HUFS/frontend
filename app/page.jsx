"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const menuItems = [
  { label: "ARCHIVE", korean: "아카이브", href: "#archive" },
  { label: "MEMBERS", korean: "멤버", href: "#members" },
  { label: "GALLERY", korean: "갤러리", href: "#gallery" },
  { label: "RECRUITING", korean: "리크루팅", href: "#recruiting" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21 8.3c-.2-1.5-1.1-2.3-2.5-2.5C16.4 5.5 12 5.5 12 5.5s-4.4 0-6.5.3C4.1 6 3.2 6.8 3 8.3A28.4 28.4 0 0 0 3 15.7c.2 1.5 1.1 2.3 2.5 2.5 2.1.3 6.5.3 6.5.3s4.4 0 6.5-.3c1.4-.2 2.3-1 2.5-2.5a28.4 28.4 0 0 0 0-7.4Z" />
      <path d="m10 15 5.2-3L10 9v6Z" className="icon-cutout" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="m6 3 5 5-5 5-1.6-1.6L7.8 8 4.4 4.6 6 3Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function BgmIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function SfxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13 2 5 14h6l-2 8 10-14h-6l2-6Z" />
    </svg>
  );
}

function SoundTrack({ id, label, icon, value, onChange }) {
  return (
    <div className="sound-track">
      <span className="sound-track-icon" aria-hidden="true">
        {icon}
      </span>
      <label className="sound-track-name" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="sound-track-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function SoundSystemPanel({
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
        <aside className="sound-panel" aria-label="Sound system">
          <div className="sound-panel-top">
            <div className="sound-panel-titleblock">
              <p className="sound-panel-kicker">AUDIO CONTROL</p>
              <h2>SOUND SYSTEM</h2>
            </div>
            <button className="sound-close" type="button" aria-label="Close sound system" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="sound-tracks">
            <SoundTrack
              id="bgm-level"
              label="BGM"
              icon={<BgmIcon />}
              value={bgmLevel}
              onChange={onBgmChange}
            />
            <SoundTrack
              id="sfx-level"
              label="SFX"
              icon={<SfxIcon />}
              value={sfxLevel}
              onChange={onSfxChange}
            />
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

function MenuList({ activeIndex, reduceMotion, onActivate, onClose, onHoverSound }) {
  return (
    <div className="menu-stack" role="list">
      {menuItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.a
            key={item.label}
            className={`menu-item ${isActive ? "is-active" : ""}`}
            href={item.href}
            role="listitem"
            data-menu-index={index}
            aria-current={isActive ? "page" : undefined}
            onMouseEnter={() => {
              onActivate(index);
              onHoverSound?.();
            }}
            onFocus={() => {
              onActivate(index);
              onHoverSound?.();
            }}
            onClick={() => {
              onActivate(index);
              onClose?.();
            }}
            initial={reduceMotion ? false : { opacity: 1, x: 54, rotate: -2 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0, rotate: -2 }}
            whileHover={reduceMotion ? {} : { x: -12, rotate: -3.8 }}
            whileFocus={reduceMotion ? {} : { x: -12, rotate: -3.8 }}
            transition={{
              delay: 0.08 + index * 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="menu-shadow" />
            <span className="menu-base" />
            <motion.span
              className="menu-fill"
              animate={
                isActive && !reduceMotion
                  ? {
                      scaleX: [0, 1.18, 0.97, 1],
                      scaleY: [0.9, 1.12, 0.98, 1],
                    }
                  : { scaleX: isActive ? 1 : 0.3, scaleY: 1 }
              }
              transition={{ duration: 0.36, ease: [0.34, 1.56, 0.64, 1] }}
            />
            <span className="menu-text">
              <strong>{item.label}</strong>
              <em>{item.korean}</em>
            </span>
            <span className="menu-arrow">
              <ChevronIcon />
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

const DEFAULT_BGM_LEVEL = 22;
const DEFAULT_SFX_LEVEL = 36;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSoundPanelOpen, setIsSoundPanelOpen] = useState(false);
  const [bgmLevel, setBgmLevel] = useState(DEFAULT_BGM_LEVEL);
  const [sfxLevel, setSfxLevel] = useState(DEFAULT_SFX_LEVEL);
  const [isMutedAll, setIsMutedAll] = useState(false);
  const hoverAudioRef = useRef(null);
  const bgmAudioRef = useRef(null);
  const bgmLevelRef = useRef(DEFAULT_BGM_LEVEL);
  const sfxLevelRef = useRef(DEFAULT_SFX_LEVEL);
  const muteSnapshotRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const bars = useMemo(() => [0, 1, 2, 3], []);

  useEffect(() => {
    hoverAudioRef.current = new Audio("/audio/menu-button-hover.mp3");
    hoverAudioRef.current.preload = "auto";

    const bgm = new Audio("/audio/crimson-red-main-theme.mp3");
    bgm.preload = "auto";
    bgm.loop = true;
    bgm.volume = DEFAULT_BGM_LEVEL / 100;

    function handleBgmEnded() {
      bgm.currentTime = 0;
      if (bgmLevelRef.current > 0) {
        void bgm.play().catch(() => {});
      }
    }

    bgm.addEventListener("ended", handleBgmEnded);
    bgmAudioRef.current = bgm;

    return () => {
      bgm.removeEventListener("ended", handleBgmEnded);
      bgm.pause();
    };
  }, []);

  function applyBgmLevel(level) {
    const bgm = bgmAudioRef.current;
    if (!bgm) return;

    bgmLevelRef.current = level;
    setBgmLevel(level);
    bgm.loop = true;
    bgm.volume = level / 100;

    if (level === 0) {
      bgm.pause();
      return;
    }

    if (bgm.ended) {
      bgm.currentTime = 0;
    }

    void bgm.play().catch(() => {});
  }

  function clearMuteSnapshot() {
    if (!muteSnapshotRef.current) return;

    muteSnapshotRef.current = null;
    setIsMutedAll(false);
  }

  function applySfxLevel(level) {
    sfxLevelRef.current = level;
    setSfxLevel(level);
  }

  function unlockAudio() {
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
  }

  function openSoundPanel() {
    unlockAudio();
    setIsSoundPanelOpen(true);
  }

  function closeSoundPanel() {
    setIsSoundPanelOpen(false);
  }

  function handleBgmChange(level) {
    unlockAudio();
    clearMuteSnapshot();
    applyBgmLevel(level);
  }

  function handleSfxChange(level) {
    unlockAudio();
    clearMuteSnapshot();
    applySfxLevel(level);
  }

  function handleMuteAll() {
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
  }

  useEffect(() => {
    if (reduceMotion) return;

    function handleFirstInteraction() {
      unlockAudio();
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!isSoundPanelOpen) return;

    const mobileQuery = window.matchMedia("(max-width: 820px)");
    if (!mobileQuery.matches) return;

    const scrollY = window.scrollY;
    document.documentElement.classList.add("sound-panel-scroll-lock");
    document.body.classList.add("sound-panel-scroll-lock");
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.documentElement.classList.remove("sound-panel-scroll-lock");
      document.body.classList.remove("sound-panel-scroll-lock");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [isSoundPanelOpen]);

  function playMenuHoverSound() {
    const level = sfxLevelRef.current;
    if (level === 0) return;

    const template = hoverAudioRef.current;
    if (!template) return;

    const audio = template.cloneNode(true);
    audio.volume = level / 100;
    void audio.play().catch(() => {});
  }

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
        setActiveIndex((index) => (index + 1) % menuItems.length);
        playMenuHoverSound();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + menuItems.length) % menuItems.length);
        playMenuHoverSound();
      }

      if (event.key === "Escape" && isSoundPanelOpen) {
        event.preventDefault();
        closeSoundPanel();
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
  }, [activeIndex, isMobileMenuOpen, isSoundPanelOpen]);

  return (
    <main className="page-shell">
      <div className="transition-bars" aria-hidden="true">
        {bars.map((bar) => (
          <motion.span
            key={bar}
            initial={reduceMotion ? false : { scaleX: 0, skewX: -16 }}
            animate={
              reduceMotion
                ? {}
                : {
                    scaleX: [0, 1, 1, 0],
                    skewX: -16,
                    transition: {
                      delay: bar * 0.05,
                      duration: 1.05,
                      times: [0, 0.4, 0.62, 1],
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }
            }
          />
        ))}
      </div>

      <header className="site-header">
        <a className="brand-mark" href="#" aria-label="CRIMSON RED home">
          <span>CRIMSON</span>
          <strong>RED</strong>
        </a>
        <div className="header-tools" aria-label="Social links">
          <a
            href="https://www.instagram.com/hufs_crimsonred/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UC2VACyqqLyP95VkfFLBRoGA"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </a>
        </div>
        <button
          className={`hamburger-button ${isMobileMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label="Open main menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              className="mobile-menu-backdrop"
              type="button"
              aria-label="Close main menu"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? {} : { opacity: 1 }}
              exit={reduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.aside
              className="mobile-menu-panel"
              aria-label="Mobile main menu"
              initial={reduceMotion ? false : { opacity: 0, x: 90, skewX: -10 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0, skewX: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, x: 90, skewX: -10 }}
              transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="menu-kicker">/// MAIN MENU ///</p>
              <MenuList
                activeIndex={activeIndex}
                reduceMotion={reduceMotion}
                onActivate={setActiveIndex}
                onClose={() => setIsMobileMenuOpen(false)}
                onHoverSound={playMenuHoverSound}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSoundPanelOpen && (
          <SoundSystemPanel
            reduceMotion={reduceMotion}
            bgmLevel={bgmLevel}
            sfxLevel={sfxLevel}
            isMutedAll={isMutedAll}
            onBgmChange={handleBgmChange}
            onSfxChange={handleSfxChange}
            onMuteAll={handleMuteAll}
            onClose={closeSoundPanel}
          />
        )}
      </AnimatePresence>

      <section className="stage">
        <div className="stage-decorations">
          <button
            className={`record-trigger ${isSoundPanelOpen ? "is-active" : ""}`}
            type="button"
            aria-label="Open sound system"
            aria-expanded={isSoundPanelOpen}
            onClick={openSoundPanel}
          >
            <span className={`record-tonearm ${bgmLevel > 0 ? "is-on" : ""}`} aria-hidden="true" />
            <img className="deco-record-img" src="/assets/asset-06.png" alt="" decoding="async" />
          </button>
          <img className="deco deco-torn-paper" src="/assets/asset-02.png" alt="" decoding="async" aria-hidden="true" />
        </div>

        <section className="hero" aria-labelledby="hero-intro">
          <div className="hero-decorations" aria-hidden="true">
            <img className="deco deco-sheet-music" src="/assets/asset-04.png" alt="" decoding="async" />
          </div>

          <div className="background-layers" aria-hidden="true">
            <div className="red-wash" />
            <motion.div className="light light-one" animate={reduceMotion ? {} : { x: [-8, 10, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="light light-two" animate={reduceMotion ? {} : { x: [9, -9, 9] }} transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="light light-three" animate={reduceMotion ? {} : { x: [-5, 12, -5] }} transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }} />
            <div className="stripe-field" />
            <div className="crowd">
              {Array.from({ length: 14 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>

          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <p className="intro" id="hero-intro">
              한국외대 영어대학 소속 락 밴드 소모임, CRIMSON RED
              <br />
              We make it loud. We make it red.
            </p>
          </motion.div>
        </section>

        <aside className="main-menu-panel desktop-menu" aria-label="Main menu">
          <p className="menu-kicker">/// MAIN MENU ///</p>
          <MenuList
            activeIndex={activeIndex}
            reduceMotion={reduceMotion}
            onActivate={setActiveIndex}
            onHoverSound={playMenuHoverSound}
          />
        </aside>

        <section className="info-strip" aria-label="Band information">
          <motion.article
            className="info-card event-card"
            id="archive"
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="card-label">RECENT LIVE</p>
            <div className="event-date">
              <strong>06.02</strong>
              <span>2026</span>
            </div>
            <h2>퀸쿠아트리아 메인 스테이지</h2>
            <p>서울캠퍼스 운동장을 뒤흔든 최근 공연.</p>
            <a className="card-button" href="#archive-details">
              자세히 보기 <ChevronIcon />
            </a>
          </motion.article>

          <motion.article
            className="info-card track-card"
            id="news"
            initial={reduceMotion ? false : { opacity: 1, y: 28 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="card-label yellow">RECOMMENDED TRACK</p>
            <div className="track-layout">
              <div className="album-art" aria-label="Abstract recommended track cover">
                <span className="cover-title">PLAY<br />LOUD</span>
              </div>
              <div>
                <h2>Basket Case</h2>
                <p className="artist">Green Day</p>
                <p>빠른 템포와 거친 에너지로 합주 전 몸을 깨우는 추천 트랙.</p>
              </div>
            </div>
          </motion.article>

        </section>
      </section>

      <footer className="site-footer" id="about">
        <span className="control-hint">↑↓ SELECT / ENTER</span>
      </footer>
    </main>
  );
}
