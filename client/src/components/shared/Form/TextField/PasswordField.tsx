import { FC, useState } from "react";
import TextField, { TextFieldProps } from "./index";

const PasswordField: FC<PasswordFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      rightIcon={showPassword ? "hide" : "show"}
      onRightIconClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setShowPassword((prev) => !prev);
      }}
      {...props}
    />
  );
};

interface PasswordFieldProps extends TextFieldProps {
  isVerify?: boolean;
}

export default PasswordField;
