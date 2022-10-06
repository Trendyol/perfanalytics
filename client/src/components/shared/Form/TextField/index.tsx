import Icon, { IconName } from "@components/shared/Icon";
import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  className?: string;
  prefix?: string;
  rightIcon?: IconName;
  onRightIconClick?: (e: Event) => void;
}

const TextField: FC<TextFieldProps> = ({ error, title, className, rightIcon, prefix, onRightIconClick, ...rest }) => {
  return (
    <div className="sadas relative w-full h-14 bg-gray-100 rounded-lg pl-4 pr-5 flex justify-between items-center">
      {prefix && <div className="text-gray-400">{prefix}</div>}
      <input
        className={classNames(
          "text-md text-gray-500 h-full w-full mr-3 bg-transparent border-none outline-none",
          className
        )}
        {...rest}
      />
      {rightIcon && (
        <Icon
          name={rightIcon}
          className="text-gray-300 w-5 h-5"
          onClick={(e: any) => onRightIconClick && onRightIconClick(e)}
        />
      )}
      {error && <div className="absolute right-2 -top-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default TextField;
