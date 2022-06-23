import { FC } from "react";
import classnames from "classnames";

const COLORS = {
  primary: "bg-primary",
  accent: "bg-accent",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS;
}

const Button: FC<ButtonProps> = ({ children, color = "primary", ...rest }) => {
  return (
    <button
      className={classnames(
        "rounded-2xl sm:rounded-md w-full h-16 sm:h-12 text-white text-md",
        COLORS[color]
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
