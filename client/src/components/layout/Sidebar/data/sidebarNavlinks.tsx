import { BiHistory } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { RiHashtag } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { NavlinkLocation } from "@enums";

const sidebarNavlinks = [
  {
    name: "Dashboard",
    LeftIcon: MdOutlineSpaceDashboard,
    location: NavlinkLocation.SIDEBAR_CENTER,
    link: "/dashboard",
  },
  {
    name: "Tags",
    LeftIcon: RiHashtag,
    isEditable: true,
    rightIconAction: () => {
      alert("TODO: Open tag settings popup");
    },
    location: NavlinkLocation.SIDEBAR_CENTER,
    link: "#",
    subItems: [
      {
        colorClass: "bg-success",
        name: "Mobile Web",
      },
      {
        colorClass: "bg-warning",
        name: "Web",
      },
      {
        colorClass: "bg-error",
        name: "SFX",
      },
    ],
  },
  {
    name: "Settings",
    LeftIcon: TbSettings,
    location: NavlinkLocation.SIDEBAR_FOOTER,
    link: "/settings",
  },
  {
    name: "Documentation",
    LeftIcon: CgFileDocument,
    location: NavlinkLocation.SIDEBAR_FOOTER,
    link: "https://trendyol.github.io/perfanalytics/",
  },
  {
    name: "Changelog",
    LeftIcon: BiHistory,
    location: NavlinkLocation.SIDEBAR_FOOTER,
    link: "https://github.com/trendyol/perfanalytics",
  },
];

export default sidebarNavlinks;
