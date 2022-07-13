import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { LAYOUT_EXCLUDED_PAGES } from "@constants";
import Toast from "@components/shared/Toast";
import PageLayout from "@layouts/PageLayout";
import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.scss";
import { SWRConfig } from "swr";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();

  if (LAYOUT_EXCLUDED_PAGES.includes(router.asPath)) {
    return (
      <>
        <Component {...pageProps} />;
        <Toast />
      </>
    );
  }

  return (
    <SWRConfig value={pageProps.fallback && { fallback: pageProps.fallback }}>
      <PageLayout>
        <Component {...pageProps} />
        <Toast />
      </PageLayout>
    </SWRConfig>
  );
};

export default App;
