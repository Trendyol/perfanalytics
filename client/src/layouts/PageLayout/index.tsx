import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import Head from "next/head";
import React, { FC } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="min-w-full flex min-h-screen bg-background overflow-hidden bg-gray-50 isolate">
      <Head>
        <title>Perfanalytics</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content=""></meta>
      </Head>
      <Sidebar />
      <div className="flex flex-grow flex-col justify-between items-center px-12 overflow-y-auto ml-64">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
