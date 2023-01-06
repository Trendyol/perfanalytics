import { chartLegends } from "@constants";
import dynamic from "next/dynamic";
import { FC } from "react";
const LineChart = dynamic(() => import("@components/shared/LineChart"), { ssr: false });

const ReportTimeChart: FC<ReportTimeChartProps> = ({ reports, setReportTimePeriod }) => {
  const chartMetricLabels = chartLegends.map((column: any) => ({ name: column.label, key: column.dataKey }));

  const series = chartMetricLabels.map((label) => ({
    name: label.name,
    data: reports
      ? reports
          .map((report: any) => {
            return [new Date(report.updatedAt).getTime(), report[label.key]];
          })
          .sort((report: number[], y: number[]) => report[0] - y[0])
      : [],
  }));

  return <LineChart key="report-chart" id="report-chart" title="Change Over Time" series={series} setReportTimePeriod={setReportTimePeriod} />;
};

interface ReportTimeChartProps {
  reports: any;
  setReportTimePeriod: (value: { start: number; end: number }) => void;
}

export default ReportTimeChart;
