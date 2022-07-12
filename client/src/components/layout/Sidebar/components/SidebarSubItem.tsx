import { generateTagLink } from "@utils/link";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

const SidebarSubItem: FC<SidebarSubItemProps> = (props) => {
  const { name, value, colorClass } = props;

  return (
    <Link href={generateTagLink(name)}>
      <a key={value} className={classNames("flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer")}>
        <div className={`w-6 h-6 rounded-full ${colorClass}`}></div>
        <div>{name}</div>
      </a>
    </Link>
  );
};

interface SidebarSubItemProps {
  name: string;
  value: string;
  colorClass: string;
}

export default SidebarSubItem;
