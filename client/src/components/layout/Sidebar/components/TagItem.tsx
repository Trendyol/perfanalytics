import Button from "@components/shared/Form/Button";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import TagModal from "./TagModal";

const TagItem: FC<SidebarSubItemProps> = (props) => {
  const { id, name, color, isDefaultTag } = props;
  const router = useRouter();

  const [showTag, setShowTag] = useState(false);

  const handleTagEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTag(true);
  };

  const isActive = router.query.tagId ? router.query.tagId === id : isDefaultTag;

  return (
    <>
      <Link
        href={{
          pathname: router.pathname,
          query: { ...router.query, ...(id && { tagId: id }) },
        }}
      >
        <a
          key={name}
          className={classNames("flex items-center relative group gap-3 p-3 rounded-md text-sm font-normal text-gray-500 hover:bg-gray-200 cursor-pointer", {
            "bg-gray-200": isActive,
          })}
        >
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
      <TagModal
        type="edit"
        show={showTag}
        tag={{ id, name, color, isDefaultTag }}
        onClose={() => setShowTag(false)}
      />
    </>
  );
};

interface SidebarSubItemProps {
  id: string;
  name: string;
  color: string;
  isDefaultTag: boolean;
}

export default TagItem;
