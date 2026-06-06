import { RecruitingIcon } from "./RecruitingIcon";

export function RecruitingPositions({ positions }) {
  return (
    <section className="recruiting-positions" aria-labelledby="recruiting-positions-title">
      <h2 id="recruiting-positions-title">SESSIONS</h2>
      <div className="recruiting-position-grid">
        {positions.map((position) => (
          <article className="recruiting-position" key={position.id}>
            <RecruitingIcon type={position.icon} />
            <h3>{position.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
