import React from "react";
import useTranslation from "next-translate/useTranslation";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { t } = useTranslation("home");
  return (
    <div className="flex justify-center items-center text-4xl font-bold min-h-full">
      <p>Home</p>
    </div>
  );
};

export default Home;
