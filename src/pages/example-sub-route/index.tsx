import type { NextPage } from "next";
import Head from "next/head";

const ExampleSubRoute: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sub Route</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Sub Route Page</main>

      <footer></footer>
    </div>
  );
};

export default ExampleSubRoute;
