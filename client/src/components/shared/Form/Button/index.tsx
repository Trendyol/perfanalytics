import { FC } from "react";
import classnames from "classnames";

const COLORS = {
  primary: "btn-primary text-white hover:bg-[#F16B00]",
  secondary: "bg-secondary text-white",
  transparent: "bg-transparent border-none text-gray-500 hover:bg-gray-200",
  danger: "btn-error text-white",
  light: "text-gray-400 hover:bg-gray-100  border border-gray-300"
};

const SIZES = {
  large: "btn-md h-[45px]",
  medium: "btn-sm h-[36px]",
  small: "btn-sm text-xs",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
  loading?: boolean;
  circle?: boolean;
  fluid?: boolean;
}

const Button: FC<ButtonProps> = ({ children, color = "primary", size = "medium", loading = false, circle = false, fluid = false, className, ...rest }) => {
  return (
    <button
      className={classnames(
        "btn no-animation rounded-[5px]",
        COLORS[color],
        SIZES[size],
        {
          loading: loading,
          "btn-circle": circle,
          "w-full": fluid,
        },
        className
      )}
      {...rest}
    >
      {!loading && children}
    </button>
  );
};

export default Button;
