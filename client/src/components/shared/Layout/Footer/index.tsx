import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import trendyolLogo from "@assets/images/trendyol.svg";
import { FOOTER_ROUTES } from "@constants";

const Footer = () => {
  const { t } = useTranslation("layout");

  return (
    <footer className="px-12 py-6 flex justify-between bg-[#F6F6F6] border-t border-[#E6E6E6]">
      <div className="flex items-center gap-2 text-sm">
        <span>{t("copyright_before")}</span>
        <Image src={trendyolLogo} alt="Trendyol logo" />
        <span>{t("copyright_after")}</span>
      </div>
      <ul className="flex items-center gap-2 text-sm list-disc list-inside">
        {FOOTER_ROUTES.map((route, index) => (
          <li
            key={route.title}
            className={`${index === 0 ? "list-none" : ""} marker:mr-0"`}
          >
            <a href={route.url} className="-ml-2">
              {route.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
