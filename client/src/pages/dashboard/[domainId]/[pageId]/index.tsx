import Page from "@modules/Page";
import { NextPage } from "next";
import Head from "next/head";

const PagePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page</title>
      </Head>

      <Page />
    </>
  );
}

export default PagePage;