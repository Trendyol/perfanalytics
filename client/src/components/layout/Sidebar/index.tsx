import { NavlinkLocation } from "@enums";
import { SidebarHeader, SidebarNavigation, SidebarFooter } from "./components";
import { sidebarNavlinks } from "./data";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white shrink-0 px-4">
      <SidebarHeader />
      <SidebarNavigation sidebarNavlinks={sidebarNavlinks.filter((navlink) => navlink.location === NavlinkLocation.SidebarCenter)} />
      <SidebarFooter sidebarNavlinks={sidebarNavlinks.filter((navlink) => navlink.location === NavlinkLocation.SidebarFooter)} />
    </aside>
  );
};

export default Sidebar;
