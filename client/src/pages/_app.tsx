import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { LAYOUT_EXCLUDED_PAGES } from "@constants";
import Toast from "@components/shared/Toast";
import PageLayout from "@layouts/PageLayout";
import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
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

export default App;
