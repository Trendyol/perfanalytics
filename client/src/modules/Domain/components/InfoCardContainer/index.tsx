import InfoCard, { InfoCardPlaceholder } from "@components/shared/InfoCard";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC } from "react";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const { domainId } = router.query;
  const { dashboardMetrics, isLoading, isError } = useDashboardMetric(domainId as string);

  if (isError) {
    return <>Loading domain metrics failed</>;
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
      {dashboardMetrics && Object.entries(dashboardMetrics).map(([key, value]) => <InfoCard key={value} title={t(key)} value={value.toString()} />)}
    </div>
  );
};

export default InfoCardContainer;
