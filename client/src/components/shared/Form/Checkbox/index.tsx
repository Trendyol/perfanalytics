import Icon from "@components/shared/Icon";
import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./style.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, ...rest }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className={styles.checkboxLabel}>
      <input type="checkbox" className="hidden" {...rest} checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
      <div className="w-4 h-4 flex items-center justify-center border-2 border-gray-400 rounded-[4px]">
        {isChecked && <Icon name="check" className="w-[12px] h-[12px]" />}
      </div>

      {label && <span className="text-sm text-gray-400">{label}</span>}
    </label>
  );
};

export default Checkbox;
