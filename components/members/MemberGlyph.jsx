const SESSION_ICON_MAP = {
  mic: { src: "/assets/session/vocal.png", flip: false },
  vocal: { src: "/assets/session/vocal.png", flip: false },
  guitar: { src: "/assets/session/guitar.png", flip: false },
  bass: { src: "/assets/session/guitar.png", flip: true },
  drum: { src: "/assets/session/drum.png", flip: false },
  keyboard: { src: "/assets/session/keyboard.png", flip: false },
};

export function MemberGlyph({ type }) {
  const icon = SESSION_ICON_MAP[String(type).toLowerCase()];

  if (icon) {
    return (
      <img
        className={`member-glyph session-glyph ${icon.flip ? "is-flipped" : ""}`}
        src={icon.src}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    );
  }

  return (
    <svg className="member-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20c.4-3 2-5 4-5s3.6 2 4 5M12 20c.4-3 2-5 4-5s3.6 2 4 5" />
    </svg>
  );
}

