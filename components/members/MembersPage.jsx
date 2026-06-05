"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "../../constants/menu";
import { useAudioController } from "../../hooks/useAudioController";
import { useMemberFilter } from "../../hooks/useMemberFilter";
import { useMenuKeyboardNavigation } from "../../hooks/useMenuKeyboardNavigation";
import { PageFrame } from "../layout/PageFrame";
import { DesktopMainMenu } from "../navigation/MainMenu";
import { FeaturedMember } from "./FeaturedMember";
import { MemberCardList } from "./MemberCardList";
import { MemberFilters } from "./MemberFilters";

const MEMBERS_MENU_INDEX = Math.max(
  MENU_ITEMS.findIndex((item) => item.href === "/members"),
  0,
);

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

  useMenuKeyboardNavigation({
    activeIndex,
    isMobileMenuOpen,
    isSoundPanelOpen: audio.isSoundPanelOpen,
    onActiveIndexChange: setActiveIndex,
    onCloseSoundPanel: audio.closeSoundPanel,
    onMobileMenuOpenChange: setIsMobileMenuOpen,
  });

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
