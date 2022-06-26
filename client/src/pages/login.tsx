import type { NextPage } from "next";
import Head from "next/head";
import Login from "@modules/Login";

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to continue." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  );
}

export default LoginPage;
