import { SidebarHeader, SidebarNavigation, SidebarFooter } from "./components";
import { sidebarNavlinks } from "./data";
import { NavlinkLocation } from "@enums";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white shrink-0 px-4">
      <SidebarHeader />
      <SidebarNavigation sidebarNavlinks={sidebarNavlinks.filter((navlink) => navlink.location === NavlinkLocation.SIDEBAR_CENTER)} />
      <SidebarFooter sidebarNavlinks={sidebarNavlinks.filter((navlink) => navlink.location === NavlinkLocation.SIDEBAR_FOOTER)} />
    </aside>
  );
};

export default Sidebar;
