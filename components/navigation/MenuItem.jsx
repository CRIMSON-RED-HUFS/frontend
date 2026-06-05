"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronIcon } from "../icons/Icons";

export function MenuItem({ index, item, isActive, reduceMotion, onActivate, onClose, onHoverSound }) {
  const [isHovered, setIsHovered] = useState(false);
  const isFilled = isActive || isHovered;

  return (
    <motion.a
      className={`menu-item ${isActive ? "is-active" : ""}`}
      href={item.href}
      role="listitem"
      data-menu-index={index}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => {
        setIsHovered(true);
        onActivate(index);
        onHoverSound?.();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => {
        setIsHovered(true);
        onActivate(index);
      }}
      onBlur={() => setIsHovered(false)}
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
          isFilled && !reduceMotion
            ? {
                scaleX: [0, 1.18, 0.97, 1],
                scaleY: [0.9, 1.12, 0.98, 1],
              }
            : { scaleX: isFilled ? 1 : 0, scaleY: 1 }
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
}
