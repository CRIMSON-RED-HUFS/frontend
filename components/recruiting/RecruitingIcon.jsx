import { SessionGlyph } from "../icons/SessionGlyph";

export function RecruitingIcon({ type }) {
  if (["vocal", "guitar", "bass", "drum", "keyboard", "group"].includes(type)) {
    return <SessionGlyph type={type} />;
  }

  if (type === "form") {
    return (
      <svg className="member-glyph recruiting-line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 3h11l3 3v17H6V3Z" />
        <path d="M17 3v5h5M9 11h7M9 15h5M9 19h7" />
      </svg>
    );
  }

  if (type === "audition") {
    return (
      <svg className="member-glyph recruiting-line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="8" cy="7" r="3" />
        <path d="M3.8 19c.7-3.4 2.1-5 4.2-5 1.5 0 2.7.8 3.5 2.5" />
        <path d="M17 4a3 3 0 0 1 3 3v3a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Z" />
        <path d="M12 10a5 5 0 0 0 10 0M17 15v4M14 20h6" />
      </svg>
    );
  }

  if (type === "megaphone") {
    return (
      <svg className="member-glyph recruiting-line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 14h4l10 4V6L8 10H4v4Z" />
        <path d="m8 14 2 6h3l-2-5M20 9l2-2M21 13h3M20 17l2 2" />
      </svg>
    );
  }

  return <SessionGlyph type="group" />;
}
