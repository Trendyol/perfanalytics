import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import MetricCard from "@components/shared/MetricCard";
import { METRIC_DATA } from "@constants";
import useLighthouseMetrics from "@hooks/useLighthouseMetrics";
import usePage from "@hooks/usePage";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import PathSettingsModal from "./PathSettingsModal";
import ReportTable from "./ReportTable";

const Path: FC = () => {
  const router = useRouter();
  const { pageId } = router.query;
  const initialDate = useRef(new Date());
  const { page } = usePage(pageId as string);

  const { analytics } = useLighthouseMetrics(pageId as string, initialDate.current, 10);

  const [showPathSettingsModal, setShowPathSettingsModal] = useState(false);

  const handleShowPathSettingsModal = () => {
    setShowPathSettingsModal(true);
  };

  const handleClosePathSettingsModal = () => {
    setShowPathSettingsModal(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-top">
        <div className="flex flex-col gap-2">
          <Breadcrumb />
          <h3 className="text-md">
            <a href={page?.url} target="_blank">{page?.url}</a>
          </h3>
        </div>
        <Button className="mt-3" onClick={handleShowPathSettingsModal}>
          Settings
        </Button>
        <PathSettingsModal show={showPathSettingsModal} onClose={handleClosePathSettingsModal} />
      </div>
      <div className="flex gap-6">
        {analytics &&
          Object.entries(analytics).map(([key, value]) => {
            return METRIC_DATA[key] ? (
              <MetricCard
                infoLink={METRIC_DATA[key].infoLink}
                percentage={0}
                score={value}
                title={METRIC_DATA[key]?.title}
              />
            ) : null;
          })}
      </div>
      <ReportTable />
    </div>
  );
};

export default Path;
