import { ASSETS } from "../../constants/assets";

export function RecruitingCTA({ applyUrl, faq, onHoverSound }) {
  const isExternal = applyUrl.startsWith("http");

  return (
    <section className="recruiting-bottom-row">
      <div className="recruiting-faq" id="recruiting-faq" aria-labelledby="recruiting-faq-title">
        <h2 id="recruiting-faq-title">FAQ</h2>
        {faq.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>

      <aside className="recruiting-cta" aria-labelledby="recruiting-cta-title">
        <img className="recruiting-cta-paper" src={ASSETS.tornPaperEdge} alt="" aria-hidden="true" />
        <div className="recruiting-cta-headline">
          <p>ARE YOU</p>
          <h2 id="recruiting-cta-title">READY</h2>
        </div>
        <a
          className="recruiting-apply-button"
          href={applyUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onMouseEnter={onHoverSound}
        >
          지원하기
        </a>
      </aside>
    </section>
  );
}
