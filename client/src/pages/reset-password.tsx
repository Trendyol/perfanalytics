import type { NextPage } from "next";
import Head from "next/head";
import ResetPassword from "@modules/ResetPassword";

const ResetPasswordPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset password to continue." />
      </Head>

      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
