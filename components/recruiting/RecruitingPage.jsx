"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  RECRUITING_APPLY_URL,
  RECRUITING_FAQ,
  RECRUITING_POSITIONS,
  RECRUITING_SCHEDULE,
  RECRUITING_SIDEBAR_ITEMS,
} from "../../constants/recruiting";
import { useAudio } from "../audio/AudioProvider";
import { PageFrame } from "../layout/PageFrame";
import { SubPageLayout } from "../layout/SubPageLayout";
import { DesktopMainMenu } from "../navigation/MainMenu";
import { SidebarMenu } from "../navigation/SidebarMenu";
import { useMenuKeyboardNavigation } from "../../hooks/useMenuKeyboardNavigation";
import { useSectionKeyboardNavigation } from "../../hooks/useSectionKeyboardNavigation";
import { usePageShellNavigation } from "../../hooks/usePageShellNavigation";
import { RecruitingCTA } from "./RecruitingCTA";
import { RecruitingHero } from "./RecruitingHero";
import { RecruitingPositions } from "./RecruitingPositions";
import { RecruitingSchedule } from "./RecruitingSchedule";

const RECRUITING_SECTION_TITLE = "/// RECRUITING";

function useRecruitingSidebarNavigation(audio, isMobileMenuOpen) {
  const [activeSection, setActiveSection] = useState(RECRUITING_SIDEBAR_ITEMS[0].id);
  const sidebarRef = useRef(null);
  const mainColumnRef = useRef(null);
  const menuPanelRef = useRef(null);
  const keyboardSections = useMemo(() => [sidebarRef, mainColumnRef, menuPanelRef], []);

  const handleSidebarSelect = useCallback((item) => {
    setActiveSection(item.id);
    document.getElementById(item.targetId)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  const sidebarGroups = useMemo(
    () => [
      {
        title: RECRUITING_SECTION_TITLE,
        items: RECRUITING_SIDEBAR_ITEMS.map((item) => ({
          id: item.id,
          label: item.label,
          active: activeSection === item.id,
          ariaPressed: activeSection === item.id,
          onSelect: () => handleSidebarSelect(item),
        })),
      },
    ],
    [activeSection, handleSidebarSelect],
  );

  useSectionKeyboardNavigation({
    disabled: isMobileMenuOpen || audio.isSoundPanelOpen,
    sections: keyboardSections,
    onNavigateSound: audio.playMenuHoverSound,
  });

  return {
    mainColumnRef,
    menuPanelRef,
    sidebarGroups,
    sidebarRef,
  };
}

export default function RecruitingPage() {
  const reduceMotion = useReducedMotion();
  const audio = useAudio();
  const {
    activeIndex,
    setActiveIndex,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = usePageShellNavigation({ menuHref: "/recruiting" });
  const { mainColumnRef, menuPanelRef, sidebarGroups, sidebarRef } = useRecruitingSidebarNavigation(
    audio,
    isMobileMenuOpen,
  );

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
      className="subpage-shell recruiting-page"
      reduceMotion={reduceMotion}
      activeIndex={activeIndex}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuToggle={toggleMobileMenu}
      onCloseMobileMenu={closeMobileMenu}
      onActivateMenu={setActiveIndex}
      audio={audio}
    >
      <SubPageLayout
        sidebarWidth="190px"
        sidebar={
          <SidebarMenu
            ariaLabel="Recruiting sections"
            className="recruiting-sidebar"
            groups={sidebarGroups}
            panelRef={sidebarRef}
            onHoverSound={audio.playMenuHoverSound}
          />
        }
        mainAs="main"
        mainClassName="recruiting-main-column"
        mainRef={mainColumnRef}
        main={
          <div className="recruiting-board">
            <RecruitingHero />
            <RecruitingPositions positions={RECRUITING_POSITIONS} />
            <RecruitingSchedule schedule={RECRUITING_SCHEDULE} />
            <RecruitingCTA
              applyUrl={RECRUITING_APPLY_URL}
              faq={RECRUITING_FAQ}
              onHoverSound={audio.playMenuHoverSound}
            />
          </div>
        }
        asideClassName="recruiting-side-column"
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
