import { DesktopMainMenu } from "../navigation/MainMenu";
import { BottomInfoSection } from "../sections/BottomInfoSection";
import { HeroAssets } from "./HeroAssets";
import { HeroSection } from "./HeroSection";

export function Stage({
  activeIndex,
  reduceMotion,
  onActivateMenu,
  onHoverMenuSound,
}) {
  return (
    <section className="stage">
      <HeroAssets />
      <HeroSection reduceMotion={reduceMotion} />
      <DesktopMainMenu
        activeIndex={activeIndex}
        reduceMotion={reduceMotion}
        onActivate={onActivateMenu}
        onHoverSound={onHoverMenuSound}
      />
      <BottomInfoSection reduceMotion={reduceMotion} />
    </section>
  );
}
