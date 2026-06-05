"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "../../constants/menu";
import { useAudioController } from "../../hooks/useAudioController";
import { useMemberFilter } from "../../hooks/useMemberFilter";
import { PageFrame } from "../layout/PageFrame";
import { DesktopMainMenu } from "../navigation/MainMenu";
import { FeaturedMember } from "./FeaturedMember";
import { MemberCardList } from "./MemberCardList";
import { MemberFilters } from "./MemberFilters";

const MEMBERS_MENU_INDEX = MENU_ITEMS.findIndex((item) => item.href === "/members");

export default function MembersPage() {
  const [activeIndex, setActiveIndex] = useState(MEMBERS_MENU_INDEX);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const audio = useAudioController({ reduceMotion });
  const {
    filteredMembers,
    selectedGeneration,
    selectedMember,
    selectedMemberId,
    selectedSession,
    setSelectedGeneration,
    setSelectedMemberId,
    setSelectedSession,
  } = useMemberFilter();

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % MENU_ITEMS.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      }

      if (event.key === "Escape" && audio.isSoundPanelOpen) {
        event.preventDefault();
        audio.closeSoundPanel();
      }

      if (event.key === "Escape" && isMobileMenuOpen) {
        event.preventDefault();
        setIsMobileMenuOpen(false);
      }

      if (event.key === "Enter") {
        const scope = isMobileMenuOpen ? ".mobile-menu-panel" : ".desktop-menu";
        const item = document.querySelector(`${scope} [data-menu-index="${activeIndex}"]`);

        if (item) {
          event.preventDefault();
          item.click();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, audio, isMobileMenuOpen]);

  return (
    <PageFrame
      className="members-page"
      reduceMotion={reduceMotion}
      activeIndex={activeIndex}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
      onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      onActivateMenu={setActiveIndex}
      audio={audio}
    >
      <div className="members-page-grid">
        <MemberFilters
          selectedGeneration={selectedGeneration}
          selectedSession={selectedSession}
          onGenerationChange={setSelectedGeneration}
          onSessionChange={setSelectedSession}
        />

        <section className="members-main-column">
          <FeaturedMember member={selectedMember} reduceMotion={reduceMotion} />
          <MemberCardList
            members={filteredMembers}
            selectedGeneration={selectedGeneration}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
          />
        </section>

        <aside className="members-side-column">
          <DesktopMainMenu
            activeIndex={activeIndex}
            reduceMotion={reduceMotion}
            onActivate={setActiveIndex}
            onHoverSound={audio.playMenuHoverSound}
          />
        </aside>
      </div>
    </PageFrame>
  );
}
