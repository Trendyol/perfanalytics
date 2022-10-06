import type { NextPage } from "next";
import Head from "next/head";
import Signup from "@modules/Signup";

const SignupPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup to continue." />
      </Head>

      <Signup />
    </div>
  );
};

export default SignupPage;
