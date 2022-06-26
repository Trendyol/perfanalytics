import { FC } from "react";
import classnames from "classnames";

const COLORS = {
  primary: "bg-primary",
  accent: "bg-accent",
};

const SIZES = {
  large: "py-4 px-12 text-md rounded-xl",
  medium: "py-2 px-6 text-sm rounded-xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
}

const Button: FC<ButtonProps> = ({
  children,
  color = "primary",
  size = "medium",
  ...rest
}) => {
  return (
    <button
      className={classnames(
        "w-full text-white",
        COLORS[color],
        SIZES[size]
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
