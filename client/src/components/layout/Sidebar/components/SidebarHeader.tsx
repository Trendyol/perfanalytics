import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import trendyolLogo from "@assets/images/trendyol.svg";

const SidebarHeader: FC<SidebarHeaderProps> = () => {
  return (
    <header className="flex items-center justify-center h-28 p-4">
      <Link href="/dashboard">
          <Image priority src={trendyolLogo} alt="Trendyol logo" width={150} height={61.48} />
      </Link>
    </header>
  );
};

interface SidebarHeaderProps {}

export default SidebarHeader;
