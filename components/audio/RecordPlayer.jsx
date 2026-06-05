import { ASSETS } from "../../constants/assets";

export function RecordPlayer({ className = "", isSoundPanelOpen, onOpenSoundPanel }) {
  return (
    <button
      className={`record-trigger ${className} ${isSoundPanelOpen ? "is-active" : ""}`}
      type="button"
      aria-label="Open sound system"
      aria-expanded={isSoundPanelOpen}
      onClick={onOpenSoundPanel}
    >
      <img className="deco-record-img" src={ASSETS.record} alt="" decoding="async" />
    </button>
  );
}
