import { SOCIAL_LINKS } from "../../constants/social";
import { InstagramIcon, YouTubeIcon } from "../icons/Icons";

export function SiteHeader({ isMobileMenuOpen, onMobileMenuToggle }) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="/" aria-label="CRIMSON RED home">
        <span>CRIMSON</span>
        <strong>RED</strong>
      </a>
      <div className="header-tools" aria-label="Social links">
        <a
          href={SOCIAL_LINKS.instagram}
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a href={SOCIAL_LINKS.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon />
        </a>
      </div>
      <button
        className={`hamburger-button ${isMobileMenuOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Open main menu"
        aria-expanded={isMobileMenuOpen}
        onClick={onMobileMenuToggle}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
