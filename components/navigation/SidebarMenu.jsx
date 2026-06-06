"use client";

import { SessionGlyph } from "../icons/SessionGlyph";

export function SidebarMenu({ ariaLabel, className = "", groups, panelRef, onHoverSound }) {
  return (
    <aside
      className={`page-sidebar-panel subpage-sidebar ${className}`.trim()}
      aria-label={ariaLabel}
      ref={panelRef}
    >
      {groups.map((group) => (
        <section className="page-sidebar-group" key={group.title}>
          <h2 className="page-sidebar-heading">{group.title}</h2>
          <div className="page-sidebar-stack">
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`page-sidebar-button ${item.active ? "is-active" : ""} ${
                  item.icon ? "has-icon" : item.trailing ? "has-trailing" : ""
                }`}
                type="button"
                aria-current={item.active ? "page" : undefined}
                aria-pressed={item.ariaPressed}
                onClick={item.onSelect}
                onMouseEnter={onHoverSound}
              >
                {item.icon && <SessionGlyph type={item.icon} />}
                <span className="page-sidebar-label">{item.label}</span>
                {item.trailing && <span className="page-sidebar-trailing">{item.trailing}</span>}
              </button>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
