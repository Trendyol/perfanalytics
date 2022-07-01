import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import ActiveLink from "@components/shared/Layout/ActiveLink";
import trendyolLogo from "@assets/images/trendyol.svg";
import { HEADER_ROUTES } from "src/constants";
import UserSection from "./UserSection";

const Header = () => {
  const { t } = useTranslation("layout");

  return (
    <header className="flex justify-between px-12 py-4 bg-[#F6F6F6] border-b border-[#E6E6E6] h-[70px]">
      <Link href="/">
        <a className="flex items-center">
          <Image src={trendyolLogo} alt="Trendyol logo" />
        </a>
      </Link>
      <div className="flex items-center">
        <div className="flex gap-5">
          {HEADER_ROUTES.map((route) => (
            <ActiveLink key={route} href={`/${route}`}>
              {t(route)}
            </ActiveLink>
          ))}
        </div>
      </div>
      <UserSection />
    </header>
  );
};

export default Header;
