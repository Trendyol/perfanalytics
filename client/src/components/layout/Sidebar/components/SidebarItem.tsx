import { FC } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarSubItem from "./SidebarSubItem";
import EditButton from "./EditButton";

const SideItem: FC<SideItemProps> = (props) => {
  const { name, LeftIcon, link, subItems, rightIconAction, isEditable = false } = props;
  const router = useRouter();

  const isActiveRoute = link === router.asPath;

  return (
    <li className="flex flex-col items-stretch justify-between font-medium">
      <Link href={link}>
        <a
          className={classNames("flex items-center gap-2 text-gray-500 w-full p-3 relative rounded-md cursor-pointer", {
            "hover:bg-gray-200": !isActiveRoute && !subItems,
            "hover:bg-none cursor-default": subItems,
            "bg-gray-400 text-white": isActiveRoute,
          })}
        >
          <LeftIcon fontSize={24} />
          <span className="mr-auto">{name}</span>
          {isEditable && rightIconAction && <EditButton rightIconAction={rightIconAction} />}
        </a>
      </Link>
      {subItems && (
        <ul className="ml-5 flex flex-col">
          {subItems.map((subItem) => (
            <SidebarSubItem {...subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

interface SideItemProps {
  name: string;
  link: string;
  LeftIcon: any;
  isEditable?: boolean;
  subItems?: Array<{
    name: string;
    value: string;
    colorClass: string;
  }>;
  rightIconAction?: () => void;
}

export default SideItem;
