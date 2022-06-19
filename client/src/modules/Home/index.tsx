import React from "react";
import useTranslation from "next-translate/useTranslation";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { t } = useTranslation("home");
  return <main data-testid="home">{t('home')}</main>;
};

export default Home;
