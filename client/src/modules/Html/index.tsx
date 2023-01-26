import Breadcrumb from "@components/shared/Breadcrumb";
import useReport from "@hooks/useReport";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC } from "react";

const Html: FC = () => {
  const { t } = useTranslation("html");
  const router = useRouter();
  const { reportId } = router.query;

  const { report, isLoading, isError } = useReport(reportId as string);

  if (isError) return <div>{t("error")}</div>;
  if (isLoading || !report) return <div>{t("loading")}</div>;

  return (
    <div className="h-full">
      <Breadcrumb />
      <iframe className="mt-3" height="100%" width="100%" src={report.html[0]}></iframe>
    </div>
  );
};

export default Html;
