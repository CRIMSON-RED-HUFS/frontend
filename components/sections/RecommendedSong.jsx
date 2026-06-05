"use client";

import { motion } from "framer-motion";
import { RECOMMENDED_SONG } from "../../constants/content";

export function RecommendedSong({ reduceMotion }) {
  return (
    <motion.article
      className="info-card track-card"
      id="news"
      initial={reduceMotion ? false : { opacity: 1, y: 28 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="card-label yellow">{RECOMMENDED_SONG.label}</p>
      <div className="track-layout">
        <div className="album-art" aria-label="Abstract recommended track cover">
          <span className="cover-title">
            PLAY
            <br />
            LOUD
          </span>
        </div>
        <div>
          <h2>{RECOMMENDED_SONG.title}</h2>
          <p className="artist">{RECOMMENDED_SONG.artist}</p>
          <p>{RECOMMENDED_SONG.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

