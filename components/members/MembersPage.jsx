"use client";

import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudio } from "../audio/AudioProvider";
import { useMemberFilter } from "../../hooks/useMemberFilter";
import { useMenuKeyboardNavigation } from "../../hooks/useMenuKeyboardNavigation";
import { useMemberMainColumnKeyboardNavigation } from "../../hooks/useMemberMainColumnKeyboardNavigation";
import { useSectionKeyboardNavigation } from "../../hooks/useSectionKeyboardNavigation";
import { usePageShellNavigation } from "../../hooks/usePageShellNavigation";
import { PageFrame } from "../layout/PageFrame";
import { SubPageLayout } from "../layout/SubPageLayout";
import { DesktopMainMenu } from "../navigation/MainMenu";
import { FeaturedMember } from "./FeaturedMember";
import { MemberCardList } from "./MemberCardList";
import { MemberFilters } from "./MemberFilters";

export default function MembersPage() {
  const filterPanelRef = useRef(null);
  const mainColumnRef = useRef(null);
  const menuPanelRef = useRef(null);
  const keyboardSections = useMemo(() => [filterPanelRef, mainColumnRef, menuPanelRef], []);
  const reduceMotion = useReducedMotion();
  const audio = useAudio();
  const {
    activeIndex,
    setActiveIndex,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = usePageShellNavigation({ menuHref: "/members" });
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

  const mainColumnKeyboard = useMemberMainColumnKeyboardNavigation(audio.playMenuHoverSound);

  useSectionKeyboardNavigation({
    disabled: isMobileMenuOpen || audio.isSoundPanelOpen,
    mainColumn: mainColumnKeyboard,
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
      className="subpage-shell members-page"
      reduceMotion={reduceMotion}
      activeIndex={activeIndex}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuToggle={toggleMobileMenu}
      onCloseMobileMenu={closeMobileMenu}
      onActivateMenu={setActiveIndex}
      audio={audio}
    >
      <SubPageLayout
        sidebarWidth="180px"
        sidebar={
          <MemberFilters
            panelRef={filterPanelRef}
            selectedGeneration={selectedGeneration}
            selectedSession={selectedSession}
            onGenerationChange={setSelectedGeneration}
            onSessionChange={setSelectedSession}
          />
        }
        mainAs="section"
        mainClassName="members-main-column"
        mainRef={mainColumnRef}
        main={
          <>
            <FeaturedMember member={selectedMember} reduceMotion={reduceMotion} />
            <MemberCardList
              members={filteredMembers}
              selectedGeneration={selectedGeneration}
              selectedMemberId={selectedMemberId}
              onSelectMember={setSelectedMemberId}
            />
          </>
        }
        asideClassName="members-side-column"
        asideRef={menuPanelRef}
        aside={
          <DesktopMainMenu
            activeIndex={activeIndex}
            reduceMotion={reduceMotion}
            onActivate={setActiveIndex}
            onHoverSound={audio.playMenuHoverSound}
          />
        }
      />
    </PageFrame>
  );
}
