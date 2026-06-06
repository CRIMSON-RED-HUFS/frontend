import { GENERATION_FILTERS, SESSION_FILTERS } from "../../constants/members";
import { SidebarMenu } from "../navigation/SidebarMenu";

export function MemberFilters({
  panelRef,
  selectedGeneration,
  selectedSession,
  onGenerationChange,
  onSessionChange,
}) {
  const groups = [
    {
      title: "/// SESSION",
      items: SESSION_FILTERS.map((filter) => ({
        id: filter.value,
        label: filter.label,
        icon: filter.icon,
        active: selectedSession === filter.value,
        ariaPressed: selectedSession === filter.value,
        onSelect: () => onSessionChange(filter.value),
      })),
    },
    {
      title: "/// GENERATION",
      items: GENERATION_FILTERS.map((generation) => ({
        id: generation,
        label: generation,
        active: selectedGeneration === generation,
        ariaPressed: selectedGeneration === generation,
        onSelect: () => onGenerationChange(generation),
      })),
    },
  ];

  return <SidebarMenu ariaLabel="Member filters" groups={groups} panelRef={panelRef} />;
}
