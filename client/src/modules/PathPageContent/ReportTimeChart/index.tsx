import { chartLegends } from "@constants";
import { Report } from "@interfaces";
import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { FC } from "react";

const LineChart = dynamic(() => import("@components/shared/LineChart"), { ssr: false });

const ReportTimeChart: FC<ReportTimeChartProps> = ({ reports, setReportTimePeriod }) => {
  const { t } = useTranslation("common");

  const chartMetricLabels = chartLegends.map((column: any) => ({ name: column.label, key: column.dataKey }));

  const annotations = reports
    ?.filter((x: any) => x.payload)
    .map((x: any) => ({
      name: x.payload.name,
      date: x.createdAt,
      url: x.payload.link,
    }));

  const series = chartMetricLabels.map((label) => ({
    name: label.name,
    data: reports
      ? reports
          .map((report: any) => {
            return [new Date(report.createdAt).getTime(), report[label.key]];
          })
          .sort((report: number[], y: number[]) => report[0] - y[0])
      : [],
  }));

  const isFetched = reports;
  const hasReport = isFetched && reports.length > 0;

  return (
    <div
      className={classNames("flex flex-col gap-7 bg-white py-7 w-full rounded-lg drop-shadow-md text-xl font-semibold  h-[480px]", hasReport ? "px-4" : "px-8")}
    >
      <div className="flex justify-between items-center">
        <h3 className={classNames("text-displayXs", hasReport && "ml-4")}>Change Over Time</h3>
      </div>
      {hasReport ? (
        <LineChart key="report-chart" id="report-chart" annotations={annotations} series={series} setReportTimePeriod={setReportTimePeriod} />
      ) : (
        <div
          className={classNames("flex flex-col gap-4 justify-center items-center w-full h-full bg-gray-100 text-displaySm text-gray-500", {
            "rounded-b-xl": !isFetched,
          })}
        >
          <span className={classNames(!isFetched && "animate-pulse-slow")}>{!isFetched ? t("loading") : t("no_data")}</span>
          {isFetched && <span className="text-sm font-normal text-gray-400">Please change time period or generate a report.</span>}
        </div>
      )}
    </div>
  );
};

interface ReportTimeChartProps {
  reports: Array<Report> | null;
  setReportTimePeriod: (value: { start: number; end: number }) => void;
}

export default ReportTimeChart;
