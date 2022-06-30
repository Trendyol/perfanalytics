import { FC, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, ...rest }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input type="checkbox" className="checkbox mr-2 rounded-xl" {...rest} />
        {label && <span className="label-text text-gray-600">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
