import { NavlinkLocation } from "@enums";
import { FC } from "react";
import SideItem from "./SidebarItem";

const SidebarNavigation: FC<SidebarNavigationProps> = (props) => {
  const { sidebarNavlinks } = props;

  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {sidebarNavlinks.map((navlink) => (
          <SideItem key={navlink.name} {...navlink} />
        ))}
      </ul>
    </nav>
  );
};

interface SidebarNavigationProps {
  sidebarNavlinks: Array<{
    name: string;
    link: string;
    LeftIcon: any;
    isEditable?: boolean;
    location: NavlinkLocation;
    rightIconAction?: () => void;
  }>;
}

export default SidebarNavigation;
