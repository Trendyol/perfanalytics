import type { NextPage } from "next";
import Head from "next/head";
import Register from "@modules/Register";

const RegisterPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register to continue." />
      </Head>

      <Register />
    </div>
  );
};

export default RegisterPage;
