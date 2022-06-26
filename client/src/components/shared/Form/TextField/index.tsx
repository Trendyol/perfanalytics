import { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextField: FC<TextFieldProps> = ({ ...rest }) => {
  return (
    <input
      className="h-14 sm:h-10 backdrop-blur bg-gray-50 outline-primary rounded-lg p-4 mb-6 sm:mb-4"
      {...rest}
    />
  );
};

export default TextField;
