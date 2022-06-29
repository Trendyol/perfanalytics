import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import ActiveLink from "@components/shared/Layout/ActiveLink";
import trendyolLogo from "@assets/images/trendyol.svg";
import userIcon from "@assets/images/user.svg";
import { HEADER_ROUTES } from "src/constants";
import Button from "@components/shared/Form/Button";
import { USER_KEY, useUser } from "@hooks/useUser";
import { deleteSession } from "src/services/userService";
import { mutate } from "swr";

const Header = () => {
  const { data: user, isLoading } = useUser(true);
  const { t } = useTranslation("layout");
  console.log(user);

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
        {isLoading ? (
          <div>Loading</div>
        ) : user ? (
          <>
            <div className="rounded-full bg-[#D9D9D9] p-2 w-8 h-8 flex justify-center items-center">
              <Image
                src={userIcon}
                alt="Trendyol logo"
                width={16}
                height={16}
              />
            </div>
            <p
              onClick={async () => {
                mutate(USER_KEY, async () => {
                  await deleteSession();
                  return null;
                });
              }}
            >
              Easter Egg!
            </p>
          </>
        ) : (
          <Button>
            <Link href="/login">{t("login")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
