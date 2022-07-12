import React, { FC } from "react";
import { NavlinkLocation } from "@enums";
import SideItem from "./SidebarItem";

const SidebarFooter: FC<SidebarFooterProps> = (props) => {
  const { sidebarNavlinks } = props;

  return (
    <footer className="mt-auto mb-6">
      <ul className="flex flex-col gap-1">
        {sidebarNavlinks.map((navlink) => (
          <SideItem {...navlink} />
        ))}
      </ul>
    </footer>
  );
};

interface SidebarFooterProps {
  sidebarNavlinks: Array<{
    name: string;
    LeftIcon: any;
    isEditable?: boolean;
    location: NavlinkLocation;
    link: string;
  }>;
}

export default SidebarFooter;
