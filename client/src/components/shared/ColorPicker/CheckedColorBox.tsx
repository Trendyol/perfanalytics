import classNames from "classnames";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";

const CheckedColorBox: FC<CheckedColorBoxProps> = (props) => {
  const { color } = props;

  return (
    <div className={classNames("flex justify-center items-center h-full aspect-square pointer rounded text-gray-500", color || "bg-gray-100")}>
      {!color && <BiPlus fontSize={16} />}
    </div>
  );
};

interface CheckedColorBoxProps {
  color?: string;
}

export default CheckedColorBox;
