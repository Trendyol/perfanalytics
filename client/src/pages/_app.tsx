import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import PageLayout from "@components/layout/PageLayout";
import { LAYOUT_EXCLUDED_PAGES } from "@constants";
import "@styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  if (LAYOUT_EXCLUDED_PAGES.includes(router.asPath)) {
    return <Component {...pageProps} />;
  }

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default MyApp;
