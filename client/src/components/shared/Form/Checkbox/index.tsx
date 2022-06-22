import { FC, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: FC<CheckboxProps> = ({ ...rest }) => {
  return <input type="checkbox" {...rest} />;
};

export default Checkbox;
