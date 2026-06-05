"use client";

import { motion } from "framer-motion";
import { ASSETS } from "../../constants/assets";

export function HeroSection({ reduceMotion }) {
  return (
    <section className="hero" aria-labelledby="hero-intro">
      <div className="hero-decorations" aria-hidden="true">
        <img className="deco deco-sheet-music" src={ASSETS.sheetMusic} alt="" decoding="async" />
      </div>

      <div className="background-layers" aria-hidden="true">
        <div className="red-wash" />
        <motion.div
          className="light light-one"
          animate={reduceMotion ? {} : { x: [-8, 10, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="light light-two"
          animate={reduceMotion ? {} : { x: [9, -9, 9] }}
          transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="light light-three"
          animate={reduceMotion ? {} : { x: [-5, 12, -5] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        />
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
  );
}

