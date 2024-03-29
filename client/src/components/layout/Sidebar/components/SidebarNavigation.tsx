import { FC } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import TagSection from "./TagSection";

const SidebarTagSection: FC<SidebarNavigationProps> = (props) => {
  const { t } = useTranslation("layout");

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li className="flex flex-col items-stretch justify-between font-medium">
          <Link href="/dashboard">
            <span className="flex items-center gap-2 text-gray-500 w-full p-3 relative rounded-md cursor-pointer hover:bg-gray-200">
              <MdOutlineSpaceDashboard fontSize={24} />
              <span className="mr-auto">{t("dashboard")}</span>
            </span>
          </Link>
        </li>
        <TagSection />
      </ul>
    </nav>
  );
};

interface SidebarNavigationProps {}

export default SidebarTagSection;
