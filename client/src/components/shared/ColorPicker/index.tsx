import { FC } from "react";
import CheckedColorBox from "./CheckedColorBox";
import ColorBox from "./ColorBox";
import { colors } from "./data";

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { checkedColor, onChange: handleColorChange } = props;

  const handleColorBoxClick = (e: any) => {
    e.preventDefault();
    const { color, checked } = e.target.dataset;
    handleColorChange(JSON.parse(checked) ? "" : color);
  };

  return (
    <div className="flex gap-3 h-11">
      <CheckedColorBox color={checkedColor} />
      <div className="flex flex-col flex-wrap gap-1" onClick={handleColorBoxClick}>
        {colors.map((color) => (
          <ColorBox key={color} color={color} checkedColor={checkedColor} />
        ))}
      </div>
    </div>
  );
};

interface ColorPickerProps {
  checkedColor: string;
  onChange: (color: string) => void;
}

export default ColorPicker;
