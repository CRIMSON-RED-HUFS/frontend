"use client";

import { useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "../../constants/menu";
import { useAudioController } from "../../hooks/useAudioController";
import { useMemberFilter } from "../../hooks/useMemberFilter";
import { useMenuKeyboardNavigation } from "../../hooks/useMenuKeyboardNavigation";
import { useMemberSectionKeyboardNavigation } from "../../hooks/useMemberSectionKeyboardNavigation";
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
  const filterPanelRef = useRef(null);
  const mainColumnRef = useRef(null);
  const menuPanelRef = useRef(null);
  const keyboardSections = useMemo(() => [filterPanelRef, mainColumnRef, menuPanelRef], []);
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

  useMemberSectionKeyboardNavigation({
    disabled: isMobileMenuOpen || audio.isSoundPanelOpen,
    sections: keyboardSections,
    onNavigateSound: audio.playMenuHoverSound,
  });

  useMenuKeyboardNavigation({
    activeIndex,
    isMobileMenuOpen,
    isSoundPanelOpen: audio.isSoundPanelOpen,
    menuScopeRef: menuPanelRef,
    onActiveIndexChange: setActiveIndex,
    onCloseSoundPanel: audio.closeSoundPanel,
    onMobileMenuOpenChange: setIsMobileMenuOpen,
    onNavigateSound: audio.playMenuHoverSound,
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
          panelRef={filterPanelRef}
          selectedGeneration={selectedGeneration}
          selectedSession={selectedSession}
          onGenerationChange={setSelectedGeneration}
          onSessionChange={setSelectedSession}
        />

        <section className="members-main-column" ref={mainColumnRef}>
          <FeaturedMember member={selectedMember} reduceMotion={reduceMotion} />
          <MemberCardList
            members={filteredMembers}
            selectedGeneration={selectedGeneration}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
          />
        </section>

        <aside className="members-side-column" ref={menuPanelRef}>
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
