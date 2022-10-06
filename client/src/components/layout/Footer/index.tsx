import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import trendyolLogo from "@assets/images/trendyol.svg";
import { FOOTER_ROUTES } from "@constants";

const Footer = () => {
  const { t } = useTranslation("layout");

  return (
    <footer className="flex justify-between py-6 w-full text-sm">
      <div className="flex items-center gap-1 text-sm">
        <span className="mb-px">{t("copyright_before")}</span>
        <Image width={83} height={16} src={trendyolLogo} alt="Trendyol logo" />
        <span className="mb-px">{t("copyright_after")}</span>
      </div>
      <ul className="flex items-center gap-2 text-sm list-disc list-inside">
        {FOOTER_ROUTES.map((route, index) => (
          <li key={route.title} className={`marker:mr-0" ${index === 0 ? " list-none" : ""}`}>
            <a href={route.url} className="-ml-2 hover:text-[#000]">
              {route.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
