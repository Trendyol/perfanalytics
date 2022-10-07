import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "@modules/Dashboard";
import { USER_KEY } from "@constants";
import { getUserData } from "@utils/swr";

const DashboardPage: NextPage<any> = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Perfanalytics</title>
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

export default DashboardPage;
