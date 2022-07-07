import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "@modules/Dashboard";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="..." />
      </Head>

      <Dashboard />
    </>
  );
};

export default HomePage;
