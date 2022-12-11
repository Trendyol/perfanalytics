import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import { FilterTimeRange } from "@enums";
import useLighthouseMetricAverages from "@hooks/useLighthouseMetricAverages";
import usePage from "@hooks/usePage";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import LighthouseMetricCards from "./LighthouseMetricCards";
import PathSettingsModal from "./PathSettingsModal";
import ReportTable from "./ReportTable";

const Path: FC = () => {
  const router = useRouter();
  const { pageId } = router.query;
  const initialDate = useRef(new Date());
  const { page } = usePage(pageId as string);
  const [reportResultPeriod, setReportResultPeriod] = useState<FilterTimeRange>(FilterTimeRange.ONE_DAY);

  const { lighthouseMetricAverages } = useLighthouseMetricAverages(pageId, initialDate.current, reportResultPeriod);

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
          <h3 className="text-md h-6">
            <a href={page?.url} target="_blank">
              {page?.url}
            </a>
          </h3>
        </div>
        <Button className="mt-3" onClick={handleShowPathSettingsModal}>
          Settings
        </Button>
        <PathSettingsModal show={showPathSettingsModal} onClose={handleClosePathSettingsModal} />
      </div>
      <LighthouseMetricCards metrics={lighthouseMetricAverages} />
      <ReportTable reportResultPeriod={reportResultPeriod} setReportResultPeriod={setReportResultPeriod} />
    </div>
  );
};

export default Path;
