import Link from "next/link";
import { SOCIAL_LINKS } from "../../constants/social";
import { InstagramIcon, YouTubeIcon } from "../icons/Icons";

export function SiteHeader({ isMobileMenuOpen, onMobileMenuToggle }) {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label="CRIMSON RED home">
        <span>CRIMSON</span>
        <strong>RED</strong>
      </Link>
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
        aria-controls="main-menu-mobile"
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
        onClick={onMobileMenuToggle}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
