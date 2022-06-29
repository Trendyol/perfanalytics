import { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
}

const TextField: FC<TextFieldProps> = ({ error, ...rest }) => {
  return (
    <div className="mb-6">
      <input
        className="h-14 sm:h-10 backdrop-blur bg-gray-50 outline-primary rounded-lg p-4 sm:mb-4 w-full"
        {...rest}
      />
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  );
};

export default TextField;
