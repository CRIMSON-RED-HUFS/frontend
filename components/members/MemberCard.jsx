"use client";

import { useState } from "react";
import { SessionGlyph } from "../icons/SessionGlyph";
import { MemberPortrait } from "./MemberPortrait";

export function MemberCard({ member, isSelected, globalIndex, memberCount, onSelect }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      className={`member-card ${isSelected ? "is-selected" : ""} ${isFocused ? "is-focused" : ""}`}
      type="button"
      role="option"
      aria-selected={isSelected}
      data-global-index={globalIndex}
      data-member-count={memberCount}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={() => onSelect(member.id)}
    >
      <MemberPortrait member={member} variant="card" />
      <span className="member-card-selected-label">SELECTED</span>
      <span className="member-card-icon">
        <SessionGlyph type={member.session} />
      </span>
      <span className="member-card-copy">
        <strong>{member.name}</strong>
        <em>{member.session}</em>
      </span>
    </button>
  );
}
