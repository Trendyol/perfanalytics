import React from "react";
import useTranslation from "next-translate/useTranslation";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { t } = useTranslation("home");
  return (
    <main data-testid="home" className="font-bold underline text-3xl md:text-2xl">
      {t("home")}
    </main>
  );
};

export default Home;
