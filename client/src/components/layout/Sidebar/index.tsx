import { SidebarHeader, SidebarNavigation, SidebarFooter } from "./components";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white shrink-0 px-4">
      <SidebarHeader />
      <SidebarNavigation />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
