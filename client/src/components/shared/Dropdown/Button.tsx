import { FC } from "react";
import classnames from "classnames";
import { UserDropdownButtonType } from "@enums";

const COLORS = {
  [UserDropdownButtonType.PRIMARY]: "btn-primary text-white",
  [UserDropdownButtonType.NORMAL]: "bg-white text-gray-500",
};

const Button: FC<ButtonProps> = ({ children, type }) => {
  return <button className={classnames(COLORS[type])}>{children}</button>;
};

interface ButtonProps {
  type: UserDropdownButtonType;
  children: React.ReactNode;
}

export default Button;
