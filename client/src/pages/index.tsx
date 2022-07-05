import type { NextPage } from "next";
import Head from "next/head";
import Home from "@modules/Home";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="..." />
      </Head>

      <Home />
    </>
  );
};

export default HomePage;
