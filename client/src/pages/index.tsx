import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "@modules/Dashboard";
import { getUserDataInServerSide } from "@utils/swr";
import { USER_KEY } from "@constants";

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

export async function getServerSideProps(context: any) {
  const userData = await getUserDataInServerSide(context);

  return {
    props: {
      fallback: {
        [USER_KEY]: userData,
      },
    },
  };
}

export default HomePage;
