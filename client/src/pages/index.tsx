import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "@modules/Dashboard";
import { getUserData } from "@utils/swr";
import { USER_KEY } from "@constants";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="..." />
      </Head>

      <Dashboard />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const userData = await getUserData(context);

  return {
    props: {
      fallback: {
        [USER_KEY]: userData,
      },
    },
  };
}

export default HomePage;
