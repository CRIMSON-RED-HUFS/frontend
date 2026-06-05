"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuList } from "./MenuList";

export function DesktopMainMenu({ activeIndex, items, reduceMotion, onActivate, onHoverSound }) {
  return (
    <aside className="main-menu-panel desktop-menu" aria-label="Main menu">
      <p className="menu-kicker">/// MAIN MENU ///</p>
      <MenuList
        activeIndex={activeIndex}
        items={items}
        reduceMotion={reduceMotion}
        onActivate={onActivate}
        onHoverSound={onHoverSound}
      />
    </aside>
  );
}

export function MobileMainMenu({
  activeIndex,
  items,
  isOpen,
  reduceMotion,
  onActivate,
  onClose,
  onHoverSound,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            className="mobile-menu-backdrop"
            type="button"
            aria-label="Close main menu"
            onClick={onClose}
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
              items={items}
              reduceMotion={reduceMotion}
              onActivate={onActivate}
              onClose={onClose}
              onHoverSound={onHoverSound}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
