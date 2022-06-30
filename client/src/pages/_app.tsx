import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import PageLayout from "@components/layout/PageLayout";
import { LAYOUT_EXCLUDED_PAGES } from "@constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.scss";
import Toast from "@components/shared/Toast";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
    <PageLayout>
      <Component {...pageProps} />
      <Toast />
    </PageLayout>
  );
};

export default MyApp;
