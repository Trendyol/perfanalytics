import type { NextPage } from "next";
import Head from "next/head";
import Home from "@modules/Home";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />

      <footer></footer>
    </div>
  );
};

export default HomePage;
