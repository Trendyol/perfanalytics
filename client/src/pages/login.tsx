import type { NextPage } from "next";
import Head from "next/head";
import Login from "@modules/Login";

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login | Perfanalytics</title>
        <meta name="description" content="Login to continue." />
      </Head>

      <Login />
    </div>
  );
};

export default LoginPage;
