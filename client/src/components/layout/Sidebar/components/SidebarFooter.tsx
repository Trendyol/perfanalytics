import React, { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { BiHistory } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";

const sidebarFooterItems = [
  {
    name: "Settings",
    LeftIcon: TbSettings,
    link: "/settings",
  },
  {
    name: "Documentation",
    LeftIcon: CgFileDocument,
    link: "https://trendyol.github.io/perfanalytics/",
  },
  {
    name: "Changelog",
    LeftIcon: BiHistory,
    link: "https://github.com/trendyol/perfanalytics",
  },
];

const SidebarFooter: FC<SidebarFooterProps> = (props) => {
  return (
    <footer className="mt-auto mb-6">
      <ul className="flex flex-col gap-1">
        {sidebarFooterItems.map(({ name, LeftIcon, link }) => (
          <li className="flex flex-col items-stretch justify-between font-medium">
            <Link href={link}>
              <a className={classNames("flex items-center gap-2 text-gray-500 w-full p-3 relative rounded-md cursor-pointer hover:bg-gray-200")}>
                <LeftIcon fontSize={24} />
                <span className="mr-auto">{name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

interface SidebarFooterProps {}

export default SidebarFooter;
