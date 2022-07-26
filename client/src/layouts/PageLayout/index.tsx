import React, { FC } from "react";
import Head from "next/head";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import Sidebar from "@components/layout/Sidebar";

interface PageLayout {
  children: React.ReactNode;
}

const PageLayout: FC<PageLayout> = (props) => {
  const { children } = props;

  return (
    <div className="min-w-[1600px] flex max-h-screen bg-background overflow-hidden bg-gray-50">
      <Head>
        <title>Perfanalytics</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=1920, initial-scale=1"></meta>
      </Head>
      <Sidebar />
      <div className="flex flex-grow flex-col justify-between items-center px-12 overflow-y-auto">
        <Header />
        <main className="flex-1 w-full mt-5 mb-14">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
