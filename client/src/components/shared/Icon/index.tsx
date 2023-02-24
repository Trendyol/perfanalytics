import React, { FC } from "react";
import { BiCheck, BiHide, BiShow } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { HiDesktopComputer, HiPlus } from "react-icons/hi";
import { MdEdit, MdOutlineAlternateEmail, MdOutlinePhoneAndroid } from "react-icons/md";
import { FiClipboard } from "react-icons/fi";
import { FaClipboardCheck } from "react-icons/fa";
import { TiSortAlphabetically } from "react-icons/ti";

const iconsByName = {
  hide: BiHide,
  show: BiShow,
  check: BiCheck,
  plus: HiPlus,
  email: MdOutlineAlternateEmail,
  alphabet: TiSortAlphabetically,
  info: FiInfo,
  edit: MdEdit,
  mobile: MdOutlinePhoneAndroid,
  desktop: HiDesktopComputer,
  clipboard: FiClipboard,
  clipboardSuccess: FaClipboardCheck
};

export type IconName = keyof typeof iconsByName;

const Icon: FC<IconProps> = ({ name, ...otherProps }) => {
  return React.createElement(iconsByName[name], otherProps);
};

interface IconProps extends React.HtmlHTMLAttributes<HTMLOrSVGElement> {
  name: IconName;
}

export default Icon;
