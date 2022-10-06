import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import MetricCard from "@components/shared/MetricCard";
import useLighthouseMetrics from "@hooks/useLighthouseMetrics";
import usePage from "@hooks/usePage";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import PathSettingsModal from "./PathSettingsModal";
import ReportTable from "./ReportTable";

const metricData: Record<string, { title: string; infoLink: string }> = {
  "cumulative-layout-shift": {
    title: "CLS",
    infoLink: "https://web.dev/cls/",
  },
  "first-contentful-paint": {
    title: "FCP",
    infoLink: "https://web.dev/fcp/",
  },
  "first-meaningful-paint": {
    title: "FMP",
    infoLink: "https://web.dev/fmp/",
  },
  interactive: {
    title: "TTI",
    infoLink: "https://web.dev/tti/",
  },
  "largest-contentful-paint": {
    title: "LCP",
    infoLink: "https://web.dev/lcp/",
  },
  "speed-index": {
    title: "SI",
    infoLink: "https://web.dev/si/",
  },
  "total-blocking-time": {
    title: "TBT",
    infoLink: "https://web.dev/tbt/",
  },
};

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
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-top">
        <div className="flex flex-col gap-2">
          <Breadcrumb />
          <h3 className="text-md">
            <a href={page?.url}>{page?.url}</a>
          </h3>{" "}
        </div>
        <Button className="mt-3" onClick={handleShowPathSettingsModal}>
          Settings
        </Button>
        <PathSettingsModal show={showPathSettingsModal} onClose={handleClosePathSettingsModal} />
      </div>
      <div className="flex gap-6">
        {analytics &&
          Object.keys(analytics).map((x) => {
            return metricData[x] ? (
              <MetricCard infoLink={metricData[x].infoLink} percentage={0} score={analytics[x]} title={metricData[x]?.title} />
            ) : null;
          })}
      </div>
      <ReportTable />
    </div>
  );
};

export default Path;
