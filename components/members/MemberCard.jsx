import { MemberGlyph } from "./MemberGlyph";
import { MemberPortrait } from "./MemberPortrait";

export function MemberCard({ member, isSelected, onSelect }) {
  return (
    <button
      className={`member-card ${isSelected ? "is-selected" : ""}`}
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(member.id)}
    >
      <MemberPortrait member={member} variant="card" />
      <span className="member-card-selected-label">SELECTED</span>
      <span className="member-card-icon">
        <MemberGlyph type={member.session} />
      </span>
      <span className="member-card-copy">
        <strong>{member.name}</strong>
        <em>{member.session}</em>
      </span>
    </button>
  );
}
