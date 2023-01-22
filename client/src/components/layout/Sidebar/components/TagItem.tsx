import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import TagModal from "./TagModal";

const TagItem: FC<SidebarSubItemProps> = (props) => {
  const { id, name, color, readonly } = props;
  const router = useRouter();
  const { domainId } = router.query;

  const [showTag, setShowTag] = useState(false);

  const handleTagEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTag(true);
  };

  const isActive = router.query.tagId ? router.query.tagId === id : readonly;

  return (
    <>
      <Link
        href={{
          pathname: `/dashboard/${domainId}`,
          query: { tagId: id },
        }}
      >
        <span
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
            className="absolute right-2 w-8 px-2 hidden hover:flex justify-center items-center text-gray-500 hover:text-gray-200 group-hover:flex hover:bg-gray-400 rounded-l"
            onClick={handleTagEditClick}
          >
            <Icon name="edit" className="w-4 h-4" />
          </Button>
        </span>
      </Link>
      <TagModal type="update" show={showTag} tag={{ id, name, color, readonly }} onClose={() => setShowTag(false)} />
    </>
  );
};

interface SidebarSubItemProps {
  id: string;
  name: string;
  color: string;
  readonly: boolean;
}

export default TagItem;
