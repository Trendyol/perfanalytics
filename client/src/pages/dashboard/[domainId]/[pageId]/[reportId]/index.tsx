import Html from "@modules/Html";
import PathPageContent from "@modules/PathPageContent";
import { NextPage } from "next";
import Head from "next/head";

const HtmlPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Perfanalytics</title>
      </Head>

      <Html />
    </>
  );
};

export default HtmlPage;
