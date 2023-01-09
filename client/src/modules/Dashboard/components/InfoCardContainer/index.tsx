import InfoCard, { InfoCardPlaceholder } from "@components/shared/InfoCard";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");
  const { dashboardMetrics, isLoading, isError } = useDashboardMetric();

  if (isError) {
    return <>Loading dashboard metrics failed!</>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 w-full gap-6 mb-8">
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 w-full gap-6 mb-8">
      {dashboardMetrics &&
        Object.entries(dashboardMetrics)
          .slice(0, 4)
          .map(([key, value]) => <InfoCard key={value} title={t(key)} value={String(value)} />)}
    </div>
  );
};

export default InfoCardContainer;
