import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div>
      <Head>
        <title>404</title>
        <meta name="description" content="..." />
      </Head>

      <main>404 Page</main>

      <footer></footer>
    </div>
  );
};

export async function getServerSideProps() {
  return { props: {} };
}

export default NotFound;
