import { RecruitingIcon } from "./RecruitingIcon";

export function RecruitingSchedule({ schedule }) {
  return (
    <section className="recruiting-schedule" id="recruiting-schedule" aria-labelledby="recruiting-schedule-title">
      <h2 id="recruiting-schedule-title">SCHEDULE</h2>
      <ol className="recruiting-timeline">
        {schedule.map((item, index) => (
          <li className="recruiting-timeline-step" key={item.id}>
            <RecruitingIcon type={item.icon} />
            <strong>
              <span>{item.step}</span> {item.title}
            </strong>
            <time>{item.date}</time>
            {index < schedule.length - 1 && <em aria-hidden="true">&gt;&gt;</em>}
          </li>
        ))}
      </ol>
    </section>
  );
}
