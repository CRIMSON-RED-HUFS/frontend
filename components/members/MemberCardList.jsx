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
    setPageIndex((current) => {
      const next = current + direction;
      if (next < 0 || next >= pages.length) return current;
      return next;
    });
  }

  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < pages.length - 1;

  return (
    <section className="member-card-section" aria-label={`${selectedGeneration} members`}>
      <div className="members-section-title">
        <p>/// {selectedGeneration} MEMBERS</p>
        <span />
      </div>
      <div
        className={`member-card-carousel ${canPage ? "has-pages" : ""}`}
        data-page-index={pageIndex}
        data-page-count={pages.length}
        data-can-go-prev={canGoPrev}
        data-can-go-next={canGoNext}
      >
        {canPage && (
          <button
            className={`member-card-arrow member-card-arrow-prev ${canGoPrev ? "" : "is-disabled"}`}
            type="button"
            aria-label="Previous members"
            disabled={!canGoPrev}
            tabIndex={canGoPrev ? 0 : -1}
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
              {currentMembers.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  globalIndex={pageIndex * MEMBERS_PER_PAGE + index}
                  memberCount={members.length}
                  isSelected={member.id === selectedMemberId}
                  onSelect={onSelectMember}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {canPage && (
          <button
            className={`member-card-arrow member-card-arrow-next ${canGoNext ? "" : "is-disabled"}`}
            type="button"
            aria-label="Next members"
            disabled={!canGoNext}
            tabIndex={canGoNext ? 0 : -1}
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
