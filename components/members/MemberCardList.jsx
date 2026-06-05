"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MemberCard } from "./MemberCard";

const MEMBERS_PER_PAGE = 4;

export function MemberCardList({ members, selectedMemberId, selectedGeneration, onSelectMember }) {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];

    for (let index = 0; index < members.length; index += MEMBERS_PER_PAGE) {
      chunks.push(members.slice(index, index + MEMBERS_PER_PAGE));
    }

    return chunks.length > 0 ? chunks : [[]];
  }, [members]);

  useEffect(() => {
    setPageIndex(0);
  }, [selectedGeneration, members.length]);

  const currentMembers = pages[pageIndex] ?? pages[0];
  const canPage = pages.length > 1;
  const hasMembers = members.length > 0;

  function movePage(direction) {
    setPageIndex((current) => (current + direction + pages.length) % pages.length);
  }

  return (
    <section className="member-card-section" aria-label={`${selectedGeneration} members`}>
      <div className="members-section-title">
        <p>/// {selectedGeneration} MEMBERS</p>
        <span />
      </div>
      <div className={`member-card-carousel ${canPage ? "has-pages" : ""}`}>
        {canPage && (
          <button
            className="member-card-arrow member-card-arrow-prev"
            type="button"
            aria-label="Previous members"
            onClick={() => movePage(-1)}
          >
            ‹
          </button>
        )}
        <div className="member-card-viewport">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${selectedGeneration}-${pageIndex}`}
              className="member-card-grid"
              role="listbox"
              aria-label="Member cards"
              initial={{ opacity: 0, x: 64, skewX: -4 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              exit={{ opacity: 0, x: -64, skewX: 4 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isSelected={member.id === selectedMemberId}
                  onSelect={onSelectMember}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {canPage && (
          <button
            className="member-card-arrow member-card-arrow-next"
            type="button"
            aria-label="Next members"
            onClick={() => movePage(1)}
          >
            ›
          </button>
        )}
      </div>
      {hasMembers && (
        <div className="member-card-pagination" aria-hidden="true">
          {pages.map((_, index) => (
            <span key={index} className={index === pageIndex ? "is-active" : ""} />
          ))}
        </div>
      )}
    </section>
  );
}
