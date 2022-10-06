import { SidebarHeader, SidebarNavigation, SidebarFooter } from "./components";

const Sidebar = () => {
  return (
    <aside className="w-64">
      <div className="fixed z-50 flex flex-col bg-white h-screen shrink-0 px-4 w-64">
        <SidebarHeader />
        <SidebarNavigation />
        <SidebarFooter />
      </div>
    </aside>
  );
};

export default Sidebar;
