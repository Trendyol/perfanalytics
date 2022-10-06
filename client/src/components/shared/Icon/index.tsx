import React, { FC } from "react";
import { BiCheck, BiHide, BiShow } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TiSortAlphabetically } from "react-icons/ti";

const iconsByName = {
  hide: BiHide,
  show: BiShow,
  check: BiCheck,
  plus: HiPlus,
  email: MdOutlineAlternateEmail,
  alphabet: TiSortAlphabetically,
  info: FiInfo,
};

export type IconName = "hide" | "show" | "email" | "alphabet" | "check" | "plus" | "info";

const Icon: FC<IconProps> = ({ name, ...otherProps }) => {
  return React.createElement(iconsByName[name], otherProps);
};

interface IconProps extends React.HtmlHTMLAttributes<HTMLOrSVGElement> {
  name: IconName;
}

export default Icon;
