import Button from "@components/shared/Form/Button";
import { generateTagLink } from "@utils/link";
import Link from "next/link";
import { FC, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import TagModal from "./TagModal";

const TagItem: FC<SidebarSubItemProps> = (props) => {
  const { id, name, color } = props;

  const [showTag, setShowTag] = useState(false);

  const handleTagEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTag(true);
  };

  return (
    <>
      <Link href={generateTagLink(name)}>
        <a key={name} className="flex items-center relative group gap-3 p-3 rounded-md text-sm font-normal text-gray-500 hover:bg-gray-200 cursor-pointer">
          <div className={`w-6 h-6 rounded-full ${color}`}></div>
          <div>{name}</div>
          <Button
            color="transparent"
            size="small"
            className="absolute h-full right-0 px-2 text-gray-500 hover:text-gray-200 hidden group-hover:block hover:bg-gray-400 rounded-l-none"
            onClick={handleTagEditClick}
          >
            <MdModeEditOutline fontSize={14} />
          </Button>
        </a>
      </Link>
      <TagModal type="edit" show={showTag} tag={{ id, name, color }} onClose={() => setShowTag(false)} />
    </>
  );
};

interface SidebarSubItemProps {
  id: string;
  name: string;
  color: string;
}

export default TagItem;