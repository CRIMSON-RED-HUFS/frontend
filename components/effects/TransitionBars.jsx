"use client";

import { motion } from "framer-motion";

const TRANSITION_BARS = [0, 1, 2, 3];

export function TransitionBars({ reduceMotion }) {
  return (
    <div className="transition-bars" aria-hidden="true">
      {TRANSITION_BARS.map((bar) => (
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
  );
}

