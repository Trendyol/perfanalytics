import { FC } from "react";
import InfoCard from "@components/shared/InfoCard";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useTranslation from "next-translate/useTranslation";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");

  // TODO: hook into InfoCard 
  const { dashboardMetrics, isLoading, isError } = useDashboardMetric("");
  if (isError) {
    return <>"Loading dashboard metrics failed"</>;
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
