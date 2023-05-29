import PathPageContent from "@modules/PathPageContent";
import { NextPage } from "next";
import Head from "next/head";

const PathPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Perfanalytics</title>
      </Head>

      <PathPageContent />
    </>
  );
};

export default PathPage;
