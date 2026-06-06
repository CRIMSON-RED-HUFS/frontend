export function SubPageLayout({
  aside,
  asideClassName = "",
  asideRef,
  gridClassName = "",
  main,
  mainAs: MainTag = "div",
  mainClassName = "",
  mainRef,
  sidebar,
  sidebarWidth,
}) {
  const gridStyle = sidebarWidth ? { "--subpage-sidebar-width": sidebarWidth } : undefined;

  return (
    <div className={`subpage-grid ${gridClassName}`.trim()} style={gridStyle}>
      {sidebar}
      <MainTag className={`subpage-main ${mainClassName}`.trim()} ref={mainRef}>
        {main}
      </MainTag>
      <aside className={`page-main-menu-column subpage-aside ${asideClassName}`.trim()} ref={asideRef}>
        {aside}
      </aside>
    </div>
  );
}
