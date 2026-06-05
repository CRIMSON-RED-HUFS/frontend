import { MemberGlyph } from "./MemberGlyph";

function formatGeneration(generation) {
  if (generation === "OB") return "OB";

  return `${generation.replace("ST", "").replace("TH", "")}기`;
}

export function MemberProfileInfo({ member }) {
  return (
    <div className="featured-member-info">
      <p className="members-kicker">/// CURRENT MEMBER</p>
      <div className="featured-name-row">
        <h1>{member.name}</h1>
        <span aria-hidden="true">☆</span>
      </div>
      <p className="featured-korean-name">{member.koreanName}</p>
      <div className="featured-session">
        <strong>{member.session}</strong>
        <MemberGlyph type={member.session} />
      </div>
      <dl className="member-spec-grid">
        <div>
          <dt>GENERATION</dt>
          <dd>{formatGeneration(member.generation)}</dd>
        </div>
        <div>
          <dt>SESSION</dt>
          <dd>{member.position}</dd>
        </div>
        <div>
          <dt>BIRTH</dt>
          <dd>{member.birthday}</dd>
        </div>
        <div>
          <dt>DEPARTMENT</dt>
          <dd>{member.department}</dd>
        </div>
        <div>
          <dt>MBTI</dt>
          <dd>{member.mbti}</dd>
        </div>
      </dl>
    </div>
  );
}
