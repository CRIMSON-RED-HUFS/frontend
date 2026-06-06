import { RecordPlayer } from "../audio/RecordPlayer";
import { SoundControl } from "../audio/SoundControl";
import { TransitionBars } from "../effects/TransitionBars";
import { SiteHeader } from "./SiteHeader";
import { MobileMainMenu } from "../navigation/MainMenu";

export function PageFrame({
  children,
  className = "",
  reduceMotion,
  activeIndex = 0,
  isMobileMenuOpen = false,
  onMobileMenuToggle,
  onCloseMobileMenu,
  onActivateMenu,
  audio,
}) {
  const contentClassName = ["page-content", className].filter(Boolean).join(" ");

  return (
    <main className="page-shell">
      <TransitionBars reduceMotion={reduceMotion} />
      <SiteHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={onMobileMenuToggle}
      />
      <MobileMainMenu
        activeIndex={activeIndex}
        isOpen={isMobileMenuOpen}
        reduceMotion={reduceMotion}
        onActivate={onActivateMenu}
        onClose={onCloseMobileMenu}
        onHoverSound={audio?.playMenuHoverSound}
      />
      {audio && (
        <SoundControl
          isOpen={audio.isSoundPanelOpen}
          reduceMotion={reduceMotion}
          bgmLevel={audio.bgmLevel}
          bgmTracks={audio.bgmTracks}
          activeBgmTrackId={audio.activeBgmTrackId}
          sfxLevel={audio.sfxLevel}
          isMutedAll={audio.isMutedAll}
          onBgmChange={audio.handleBgmChange}
          onBgmTrackChange={audio.handleBgmTrackChange}
          onSfxChange={audio.handleSfxChange}
          onMuteAll={audio.handleMuteAll}
          onClose={audio.closeSoundPanel}
        />
      )}
      <div className={contentClassName}>
        {audio && (
          <div className="page-record-layer">
            <RecordPlayer
              isSoundPanelOpen={audio.isSoundPanelOpen}
              onOpenSoundPanel={audio.openSoundPanel}
            />
          </div>
        )}
        {children}
      </div>
      <footer className="site-footer" id="about">
        <span className="control-hint">↑↓ SELECT / ENTER</span>
      </footer>
    </main>
  );
}
