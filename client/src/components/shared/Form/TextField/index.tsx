import Icon, { IconName } from "@components/shared/Icon";
import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  className?: string;
  prefix?: string;
  rightIcon?: IconName;
  rightIconClassName?: string;
  onRightIconClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const TextField: FC<TextFieldProps> = ({ error, title, className, rightIcon, prefix, rightIconClassName, onRightIconClick, disabled, ...rest }) => {
  return (
    <div
      className={classNames(
        "relative w-full h-14 rounded-lg pl-4 pr-5 flex justify-between items-center",

        disabled ? "bg-gray-200" : "bg-gray-100"
      )}
    >
      {prefix && <div className="text-gray-400">{prefix}</div>}
      <input
        className={classNames("text-md text-gray-500 h-full w-full mr-3 bg-transparent border-none outline-none", className)}
        disabled={disabled}
        {...rest}
      />
      {rightIcon && (
        <Icon
          name={rightIcon}
          className={classNames(rightIconClassName ? rightIconClassName : "text-gray-600 w-8 h-8 p-1.5 cursor-pointer")}
          onClick={(e: React.MouseEvent<HTMLElement>) => onRightIconClick && onRightIconClick(e)}
        />
      )}
      {error && <div className="absolute right-2 -top-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default TextField;
