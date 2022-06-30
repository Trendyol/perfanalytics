import { FC } from "react";
import classnames from "classnames";

const COLORS = {
  primary: "btn-primary",
  accent: "bg-accent",
};

const SIZES = {
  large: "btn-md h-[45px]",
  medium: "btn-sm h-[36px]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  color = "primary",
  size = "medium",
  loading = false,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        "btn w-full text-white no-animation",
        COLORS[color],
        SIZES[size],
        {
          loading: loading,
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
