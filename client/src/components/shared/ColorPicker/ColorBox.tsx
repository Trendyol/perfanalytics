import classNames from "classnames";
import { FC, useRef, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";

const ColorBox: FC<ColorBoxProps> = (props) => {
  const { color, checkedColor } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const isChecked = color === checkedColor;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      htmlFor="colorBox"
      data-checked={isChecked}
      data-color={color}
      className={classNames(
        "flex justify-center items-center h-[calc(50%-2px)] aspect-square pointer rounded text-white cursor-pointer",
        color,
        !color && "bg-gray-100"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isChecked && isHover && <BiPlus fontSize={16} pointerEvents="none" />}
      {isChecked && <BiCheck fontSize={16} pointerEvents="none" />}

      {/* ignore input onchange */}
      <input type="radio" name="colorBox" className="hidden" data-color={color} ref={inputRef} checked={isChecked} onChange={() => {}} />
    </label>
  );
};

interface ColorBoxProps {
  color: string;
  checkedColor: string;
}

export default ColorBox;
