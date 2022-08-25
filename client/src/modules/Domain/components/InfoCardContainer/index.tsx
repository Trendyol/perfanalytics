import { FC } from "react";
import InfoCard from "@components/shared/InfoCard";
import useTranslation from "next-translate/useTranslation";
import useDashboardMetric from "@hooks/useDashboardMetric";
import { useRouter } from "next/router";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const { domainId } = router.query;

  const { dashboardMetrics, isLoading, isError } = useDashboardMetric(domainId as string);
  if (isError) {
    return <>"Loading domain metrics failed"</>;
  }

  return (
    <div className="flex flex-row w-full gap-5">
      {isLoading && <>
        <InfoCard className="w-1/4" />
        <InfoCard className="w-1/4" />
      </>}
      {dashboardMetrics && Object.entries(dashboardMetrics).map(([key, value]) =>
        <InfoCard title={t(key)} value={value.toString()} className="w-1/4" />
      )}
    </div>
  );
};

export default InfoCardContainer;
