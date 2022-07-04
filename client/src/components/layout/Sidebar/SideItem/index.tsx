import classNames from "classnames";
import { FC, ReactNode } from "react";

interface SideItemProps {
  name: string;
  icon: ReactNode;
  action?: ReactNode;
  subItems?: SubItemProps[];
}

interface SubItemProps {
  name: string;
  value: string;
  color: string;
}

const SideItem: FC<SideItemProps> = ({ name, icon, action, subItems }) => {
  return (
    <>
      <li className="flex flex-row items-center justify-between hover:bg-slate-100 px-4 py-2 cursor-pointer">
        <span className="flex flex-row items-center gap-2">
          {icon}
          {name}
        </span>
        {action}
      </li>
      {subItems?.map(({ name, color, value }) => (
        <li
          key={value}
          className={classNames(
            "flex flex-row items-center hover:bg-slate-100 py-2 pl-8 pr-4 cursor-pointer",
            { "bg-slate-200 border-r-[3px] border-secondary": true }
          )}
        >
          <div
            style={{ backgroundColor: color }}
            className="h-[20px] w-[20px] rounded-[100%] mr-2"
          ></div>
          <div>{name}</div>
        </li>
      ))}
    </>
  );
};

export default SideItem;
