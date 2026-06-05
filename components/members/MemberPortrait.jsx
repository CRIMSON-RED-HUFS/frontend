import Image from "next/image";

export function MemberPortrait({ member, variant = "hero" }) {
  const hasImage = Boolean(member?.image);

  return (
    <div className={`member-portrait member-portrait-${variant} session-${member?.session?.toLowerCase() || "none"}`}>
      {hasImage ? (
        <Image
          src={member.image}
          alt={`${member.name} 프로필 사진`}
          fill
          sizes={variant === "hero" ? "(max-width: 820px) 100vw, 44vw" : "260px"}
          priority={variant === "hero"}
        />
      ) : (
        <div className="member-placeholder" aria-hidden="true">
          <span>{member?.tagline || "CR"}</span>
        </div>
      )}
      <span className="portrait-noise" aria-hidden="true" />
      <span className="portrait-slash portrait-slash-one" aria-hidden="true" />
      <span className="portrait-slash portrait-slash-two" aria-hidden="true" />
      <span className="portrait-star" aria-hidden="true">
        ☆
      </span>
    </div>
  );
}

