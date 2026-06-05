"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MemberPortrait } from "./MemberPortrait";
import { MemberProfileInfo } from "./MemberProfileInfo";

export function FeaturedMember({ member, reduceMotion }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [member?.id]);

  if (!member) {
    return (
      <section className="featured-member is-empty" aria-label="Current member">
        <div className="empty-member-stage">
          <h1>NO MEMBER</h1>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="featured-member"
      aria-label="Current member"
      initial={reduceMotion ? false : { opacity: 1, y: 24 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`featured-member-flip ${isFlipped ? "is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        onClick={() => setIsFlipped((flipped) => !flipped)}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;

          event.preventDefault();
          setIsFlipped((flipped) => !flipped);
        }}
      >
        <span className="featured-card-face featured-card-front">
          <span className="featured-portrait-wrap">
            <p className="portrait-graffiti">{member.tagline}</p>
            <MemberPortrait member={member} />
          </span>
          <MemberProfileInfo member={member} />
        </span>
        <span className="featured-card-face featured-card-back" aria-hidden={!isFlipped}>
          <span className="featured-back-kicker">/// MEMBER COMMENT</span>
          <strong>{member.name}</strong>
          <span className="featured-back-quote">“ {member.quote} ”</span>
          <span className="featured-back-label">PARTICIPATING TEAM</span>
          <span className="featured-team-list">
            {member.teams.map((team) => (
              <em key={team}>{team}</em>
            ))}
          </span>
        </span>
      </div>
    </motion.section>
  );
}
