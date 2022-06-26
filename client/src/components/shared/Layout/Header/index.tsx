import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import ActiveLink from "@components/shared/Layout/ActiveLink";
import trendyolLogo from "@assets/images/trendyol.svg";
import userIcon from "@assets/images/user.svg";
import { HEADER_ROUTES } from "src/constants";

const Header = () => {
  const { t } = useTranslation("layout");
  const isLoggedIn = false;

  return (
    <header className="flex justify-between px-12 py-4 bg-[#F6F6F6] border-b border-[#E6E6E6]">
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
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <div className="rounded-full bg-[#D9D9D9] p-2 w-8 h-8 flex justify-center items-center">
              <Image
                src={userIcon}
                alt="Trendyol logo"
                width={16}
                height={16}
              />
            </div>
            <p>Easter Egg!</p>
          </>
        ) : (
          <Link href="/login">
            <a className="text-sm py-1 px-3 bg-primary text-white rounded-md">
              {t("login")}
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
