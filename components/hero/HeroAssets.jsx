import { ASSETS } from "../../constants/assets";

export function HeroAssets() {
  return (
    <div className="stage-decorations">
      <img className="deco deco-torn-paper" src={ASSETS.tornPaper} alt="" decoding="async" aria-hidden="true" />
    </div>
  );
}
