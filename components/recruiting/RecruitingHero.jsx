import { ASSETS } from "../../constants/assets";

export function RecruitingHero() {
  return (
    <section className="recruiting-hero" id="recruiting-about" aria-labelledby="recruiting-title">
      <div className="recruiting-hero-copy">
        <p className="recruiting-kicker">/// RECRUITING</p>
        <h1 id="recruiting-title">RECRUITING</h1>
        <strong>WHO IS NEXT</strong>
      </div>

      <div className="recruiting-photo-frame" aria-label="CRIMSON RED live stage">
        <div className="recruiting-photo">
          <span className="recruiting-photo-figure" aria-hidden="true" />
          <span className="recruiting-photo-figure" aria-hidden="true" />
          <span className="recruiting-photo-figure" aria-hidden="true" />
          <span className="recruiting-photo-figure" aria-hidden="true" />
          <span className="recruiting-photo-figure" aria-hidden="true" />
          <span className="recruiting-photo-figure" aria-hidden="true" />
        </div>
      </div>

      <img className="recruiting-paper recruiting-paper-top" src={ASSETS.tornPaperEdge} alt="" aria-hidden="true" />
      <img className="recruiting-paper recruiting-paper-bottom" src={ASSETS.tornPaperEdge} alt="" aria-hidden="true" />
      <span className="recruiting-star recruiting-star-one">☆</span>
      <span className="recruiting-star recruiting-star-two">☆</span>
    </section>
  );
}
