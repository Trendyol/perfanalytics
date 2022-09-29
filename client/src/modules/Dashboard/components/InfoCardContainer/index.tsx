import InfoCard from "@components/shared/InfoCard";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");
  const { dashboardMetrics, isLoading } = useDashboardMetric();

  if (isError) {
    return <>Loading dashboard metrics failed!</>;
  }

  return (
    <div className="grid grid-cols-4 w-full gap-6 mb-8">
      {isLoading && new Array(4).fill(<InfoCard />)}
      {dashboardMetrics && Object.entries(dashboardMetrics).map(([key, value]) => <InfoCard title={t(key)} value={String(value)} />)}
    </div>
  );
};

export default InfoCardContainer;
