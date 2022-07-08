import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiTag } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import trendyolLogo from "@assets/images/trendyol.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/shared/Form/Button";
import SideItem from "./components/SideItem";

const Sidebar = () => {
  const mock = [
    {
      color: "#f5f5f5",
      name: "All",
      value: "all",
    },
    {
      color: "#a5a5a5",
      name: "Popular",
      value: "popular",
    },
  ];
  return (
    <aside className="flex flex-col justify-between w-1/5 h-screen bg-[#F6F6F6]">
      <header className="flex items-center justify-center h-[70px] p-4">
        <Link href="/">
          <a className="flex items-center">
            <Image src={trendyolLogo} alt="Trendyol logo" />
          </a>
        </Link>
      </header>

      <nav>
        <ul>
          <SideItem name="DashBoard" icon={<MdOutlineSpaceDashboard />} />
          <SideItem
            name="Tags"
            icon={<BiTag />}
            action={
              <Button color="transparent">
                <FiSettings />
              </Button>
            }
            subItems={mock}
          />
        </ul>
      </nav>

      <footer className="mt-auto mb-[50px]">
        <ul>
          <SideItem name="Settings" icon={<FiSettings />} />
          <SideItem name="Documentation" icon={<CgFileDocument />} />
          <SideItem name="Changelog" icon={<AiOutlineHistory />} />
        </ul>
      </footer>
    </aside>
  );
};

export default Sidebar;
