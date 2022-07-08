import React from "react";
import Head from "next/head";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import Sidebar from "@components/layout/Sidebar";

interface PageLayout {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayout) => {
  return (
    <div className="flex min-w-[1600px]">
      <Head>
        <title>Perfanalytics</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=1920, initial-scale=1.0"></meta>
      </Head>
      <Sidebar />
      <div className="flex flex-col justify-between w-4/5 items-center">
        <Header />
        <main className="flex-1 w-[1200px] mt-5">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
