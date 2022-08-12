import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  className?: string;
}

const TextField: FC<TextFieldProps> = ({ error, className, ...rest }) => {
  return (
    <div className="w-full">
      <input className={classNames("input w-full input-primary bg-gray-50 border-none rounded-sm", className)} {...rest} />
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  );
};

export default TextField;
