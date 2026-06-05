import { RecentPerformance } from "./RecentPerformance";
import { RecommendedSong } from "./RecommendedSong";

export function BottomInfoSection({ reduceMotion }) {
  return (
    <section className="info-strip" aria-label="Band information">
      <RecentPerformance reduceMotion={reduceMotion} />
      <RecommendedSong reduceMotion={reduceMotion} />
    </section>
  );
}

