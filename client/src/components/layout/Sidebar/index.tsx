import { SidebarHeader, SidebarNavigation, SidebarFooter } from "./components";

const Sidebar = () => {
  return (
    <aside className="fixed z-50 flex flex-col bg-white h-screen shrink-0 px-4 w-64">
      <SidebarHeader />
      <SidebarNavigation />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
