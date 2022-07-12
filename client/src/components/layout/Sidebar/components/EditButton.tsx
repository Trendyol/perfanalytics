import useTranslation from "next-translate/useTranslation";
import { FC } from "react";

const EditButton: FC<EditButtonProps> = (props) => {
  const { rightIconAction } = props;
  const { t } = useTranslation("layout");

  return (
    <button className="cursor-pointer text-xs hover:bg-gray-200 py-1 px-2 rounded-md absolute right-0" onClick={rightIconAction}>
      {t("edit_button")}
    </button>
  );
};

interface EditButtonProps {
  rightIconAction: () => void;
}

export default EditButton;
