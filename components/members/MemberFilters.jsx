import { GENERATION_FILTERS, SESSION_FILTERS } from "../../constants/members";
import { MemberGlyph } from "./MemberGlyph";

function FilterGroup({ title, children }) {
  return (
    <section className="member-filter-group">
      <h2>{title}</h2>
      <div className="member-filter-stack">{children}</div>
    </section>
  );
}

export function MemberFilters({
  panelRef,
  selectedGeneration,
  selectedSession,
  onGenerationChange,
  onSessionChange,
}) {
  return (
    <aside className="member-filter-panel" aria-label="Member filters" ref={panelRef}>
      <FilterGroup title="/// SESSION">
        {SESSION_FILTERS.map((filter) => (
          <button
            key={filter.value}
            className={`member-filter-button ${selectedSession === filter.value ? "is-active" : ""}`}
            type="button"
            aria-pressed={selectedSession === filter.value}
            onClick={() => onSessionChange(filter.value)}
          >
            <MemberGlyph type={filter.icon} />
            <span>{filter.label}</span>
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="/// GENERATION">
        {GENERATION_FILTERS.map((generation) => (
          <button
            key={generation}
            className={`member-filter-button ${selectedGeneration === generation ? "is-active" : ""}`}
            type="button"
            aria-pressed={selectedGeneration === generation}
            onClick={() => onGenerationChange(generation)}
          >
            <span>{generation}</span>
          </button>
        ))}
      </FilterGroup>
    </aside>
  );
}
