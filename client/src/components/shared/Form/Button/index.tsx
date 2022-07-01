import { FC } from "react";
import classnames from "classnames";

const COLORS = {
  primary: "btn-primary text-white",
  accent: "bg-accent text-white",
  transparent: "text-black",
};

const SIZES = {
  large: "btn-md h-[45px]",
  medium: "btn-sm h-[36px]",
  small: "btn-sm",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
  loading?: boolean;
  circle?: boolean;
  full?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  color = "primary",
  size = "medium",
  loading = false,
  circle = false,
  full = false,
  className,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        "btn no-animation",
        COLORS[color],
        SIZES[size],
        {
          loading: loading,
          "btn-circle": circle,
          "w-full": full,
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
