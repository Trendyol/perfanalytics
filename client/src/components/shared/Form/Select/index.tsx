import cn from "classnames";
import { FC, SelectHTMLAttributes } from "react";
import styles from "./style.module.scss";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultText?: string;
  options: string[];
  value: string;
  error?: string | boolean;
  onChange: any;
  onBlur: any;
}

const Select: FC<SelectProps> = ({ defaultText, options, ...otherProps }) => {
  return (
    <select
      className={cn(
        styles.customSelect,
        "relative w-full h-14 bg-gray-100 rounded-lg pl-4 pr-5 flex justify-between items-center text-gray-500"
      )}
      {...otherProps}
    >
      {defaultText && (
        <option disabled selected>
          {defaultText}
        </option>
      )}
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
