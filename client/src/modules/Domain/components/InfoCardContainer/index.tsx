import InfoCard from "@components/shared/InfoCard";
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

  return (
    <div className="grid grid-cols-4 w-full gap-6 mb-8">
      {isLoading && new Array(4).fill(<InfoCard />)}
      {dashboardMetrics && Object.entries(dashboardMetrics).map(([key, value]) => <InfoCard title={t(key)} value={value.toString()} />)}
    </div>
  );
};

export default InfoCardContainer;
