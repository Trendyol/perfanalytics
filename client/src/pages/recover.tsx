import type { NextPage } from "next";
import Head from "next/head";
import Recover from "@modules/Recover";

const RecoverPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Recover Your Account | Perfanalytics</title>
        <meta name="description" content="Recover password to continue." />
      </Head>

      <Recover />
    </div>
  );
};

export async function getServerSideProps() {
  return { props: {} };
}

export default RecoverPage;
