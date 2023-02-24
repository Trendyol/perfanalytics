import Button from "@components/shared/Form/Button";
import useTags from "@hooks/useTag";
import { Tag } from "@interfaces";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { RiHashtag } from "react-icons/ri";
import TagItem from "./TagItem";
import TagModal from "./TagModal";

const TagSection = () => {
  const [showTag, setShowTag] = useState(false);
  const router = useRouter();
  const { domainId } = router.query;
  const { tags } = useTags(domainId as string);

  const handleTagEditClick = () => {
    setShowTag(true);
  };

  if (domainId === undefined) {
    return null;
  }

  return (
    <li className="flex flex-col items-stretch justify-between font-medium">
      <div className="flex items-center gap-2 text-gray-500 w-full p-3 relative rounded-md">
        <RiHashtag fontSize={24} />
        <span className="mr-auto">Tags</span>
        <Button color="transparent" size="small" className="absolute right-0 text-gray-500" onClick={handleTagEditClick}>
          <MdAdd fontSize={18} />
        </Button>
        <TagModal type="add" show={showTag} onClose={() => setShowTag(false)} />
      </div>
      <ul className="ml-5 flex flex-col gap-1">
        {tags.map((tag: Tag) => (
          <TagItem key={tag.name} id={tag.id} name={tag.name} color={tag.color} readonly={tag.readonly || false} />
        ))}
      </ul>
    </li>
  );
};

export default TagSection;
