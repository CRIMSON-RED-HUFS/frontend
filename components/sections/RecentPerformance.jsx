"use client";

import { motion } from "framer-motion";
import { RECENT_PERFORMANCE } from "../../constants/content";
import { ChevronIcon } from "../icons/Icons";

export function RecentPerformance({ reduceMotion }) {
  return (
    <motion.article
      className="info-card event-card"
      id="archive"
      initial={reduceMotion ? false : { opacity: 1, y: 28 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="card-label">{RECENT_PERFORMANCE.label}</p>
      <div className="event-date">
        <strong>{RECENT_PERFORMANCE.date}</strong>
        <span>{RECENT_PERFORMANCE.year}</span>
      </div>
      <h2>{RECENT_PERFORMANCE.title}</h2>
      <p>{RECENT_PERFORMANCE.description}</p>
      <a className="card-button" href={RECENT_PERFORMANCE.href}>
        {RECENT_PERFORMANCE.cta} <ChevronIcon />
      </a>
    </motion.article>
  );
}

