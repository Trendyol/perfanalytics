import React from "react";
import Head from "next/head";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

interface PageLayout {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Perfanalytics</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
