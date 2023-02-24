import { ReportTimePeriod } from "@enums";
import useReports from "@hooks/useReportsInfinite";
import { getStartDateByInterval } from "@utils/common";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import PathPageHeader from "./PathPageHeader";
import ReportTable from "./ReportTable";
import ReportTimeChart from "./ReportTimeChart";

const PathPageContent: FC = () => {
  const { query } = useRouter();
  const { current: initialDate } = useRef(Date.now());

  const [reportTimePeriod, setReportTimePeriod] = useState<{ start?: number; end: number; interval?: number }>({
    end: initialDate,
    interval: ReportTimePeriod.ONE_DAY,
  });

  let startDate;

  if (reportTimePeriod.start) {
    startDate = reportTimePeriod.start;
  } else {
    startDate = getStartDateByInterval(reportTimePeriod.end, reportTimePeriod.interval!);
  }

  const { reports, length, isLoading } = useReports({
    pageId: query.pageId as string,
    startDate,
    endDate: reportTimePeriod.end,
  });

  // const { metricAverages } = useMetricAverages({ pathId: query.pageId as string, startDate, endDate: reportTimePeriod.end });

  const filterTimeRangeButtonsTexts = {
    [ReportTimePeriod.ONE_DAY]: "Last Day",
    [ReportTimePeriod.ONE_WEEK]: "Last Week",
    [ReportTimePeriod.ONE_MONTH]: "Last Month",
    [ReportTimePeriod.SIX_MONTH]: "Last Six Month",
    [ReportTimePeriod.ONE_YEAR]: "Last Year",
  };

  return (
    <div className="flex flex-col gap-8">
      <PathPageHeader />
      <div className="flex gap-4 items-center bg-white drop-shadow-md px-5 py-3 rounded-md">
        <div className="text-sm min-w-[6rem]">Select report time period:</div>
        <fieldset
          className="flex gap-2 flex-wrap"
          onChange={(e: any) =>
            setReportTimePeriod({
              end: initialDate,
              interval: e.target.value,
            })
          }
        >
          {Object.entries(filterTimeRangeButtonsTexts).map(([key, value]) => (
            <label key={key}>
              <input type="radio" key={key} value={key} defaultChecked={String(reportTimePeriod.interval) === key} name="group2" className="hidden peer" />
              <div className="text-xs font-semibold py-1 px-3 border-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-100 hover:border-gray-300 peer-checked:bg-gray-300 peer-checked:border-gray-500">
                {value}
              </div>
            </label>
          ))}
        </fieldset>
      </div>
      {/* <MetricCards metrics={metricAverages} /> */}
      <ReportTimeChart reports={reports} setReportTimePeriod={setReportTimePeriod} />
      <ReportTable reports={reports} length={length} isLoading={isLoading} />
    </div>
  );
};

export default PathPageContent;
