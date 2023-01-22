import InfoCard, { InfoCardPlaceholder } from "@components/shared/InfoCard";
import useDashboardCount from "@hooks/useDashboardCount";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC } from "react";

const InfoCardContainer: FC = () => {
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const { domainId } = router.query;
  const { dashboardCounts, isLoading, isError } = useDashboardCount(domainId as string);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 lg:grid-cols-2 w-full gap-6 mb-8">
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
        <InfoCardPlaceholder />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 lg:grid-cols-2 w-full gap-6 mb-8">
      {dashboardCounts && Object.entries(dashboardCounts).map(([key, value]) => <InfoCard key={value} title={t(key)} value={value.toString()} />)}
    </div>
  );
};

export default InfoCardContainer;
