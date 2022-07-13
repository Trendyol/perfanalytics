import { UserDropdownButtonType, UserDropdownItemType } from "@enums";
import classNames from "classnames";
import { FC, ReactNode } from "react";

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { children, type = UserDropdownItemType.ACTION, onClick } = props;

  return (
    <li>
      <div
        className={classNames("p-0", {
          "hover:bg-transparent cursor-default": type === UserDropdownItemType.INFO,
        })}
        onClick={type === UserDropdownItemType.ACTION ? onClick : () => {}}
      >
        {children}
      </div>
    </li>
  );
};

interface DropdownItemProps {
  type?: UserDropdownItemType;
  children: ReactNode;
  onClick?: () => void;
}

export default DropdownItem;
