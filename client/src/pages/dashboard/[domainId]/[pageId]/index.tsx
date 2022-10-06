import Path from "@modules/Path";
import { NextPage } from "next";
import Head from "next/head";

const PathPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Path</title>
      </Head>

      <Path />
    </>
  );
};

export default PathPage;
