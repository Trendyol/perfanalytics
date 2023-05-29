import { useEffect } from "react";
import { NextPage } from "next";
import Domain from "@modules/Domain";
import Head from "next/head";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import useDomain from "@hooks/useDomain";

const DomainPage: NextPage = () => {
  const { t } = useTranslation("domain");
  const router = useRouter();
  const { domainId } = router.query;
  const { domain, isError } = useDomain(domainId as string);

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [domain]);

  return (
    <>
      <Head>
        <title>
          {t("dashboard")} | {domain?.name}
        </title>
      </Head>

      <Domain />
    </>
  );
};

export default DomainPage;
