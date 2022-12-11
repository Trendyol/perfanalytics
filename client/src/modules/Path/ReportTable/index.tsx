import CustomTable from "@components/shared/CustomTable";
import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import LineChart from "@components/shared/LineChart";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import { FilterTimeRange } from "@enums";
import useReportsInfinite from "@hooks/useReportsInfinite";
import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useRef } from "react";

const getIconByDevice: Record<string, JSX.Element> = {
  desktop: <Icon name="desktop" className="w-5 h-5" />,
  mobile: <Icon name="mobile" className="w-5 h-5" />,
};

const columnData = [
  {
    dataKey: "createdAt",
    columnWidth: 150,
    label: "Report Date",
  },
  {
    dataKey: "device",
    label: "Device",
    columnWidth: 70,
    cellRenderer: (deviceType: string) => getIconByDevice[deviceType],
  },
  {
    dataKey: "first-contentful-paint",
    label: "FCP",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "speed-index",
    label: "SI",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "largest-contentful-paint",
    label: "LCP",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "interactive",
    label: "TTI",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "total-blocking-time",
    label: "TBT",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "cumulative-layout-shift",
    label: "CLS",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "first-meaningful-paint",
    label: "FMP",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
];

const ReportTable: FC<ReportTableProps> = ({ reportResultPeriod, setReportResultPeriod }) => {
  const { t } = useTranslation("path");
  const router = useRouter();
  const { pageId } = router.query;
  const initialDate = useRef(new Date());

  const { reports, length, size, setSize, isLoading } = useReportsInfinite(pageId as string, initialDate.current, reportResultPeriod);

  const handleReportClick = () => {
    alert("Not implemented yet.");
  };

  const handleNextPage = () => {
    if (size && setSize) {
      setSize(size + 1);
    }
  };

  const generateReport = () => {
    alert("Not implemented yet.");
  };

  const chartMetricLabels = columnData.slice(2).map((column: any) => ({ name: column.label, key: column.dataKey }));

  const series = chartMetricLabels.map((label) => ({
    name: label.name,
    data: reports
      ? reports
          .map((x: any, i: number) => {
            return [new Date(x.updatedAt).getTime(), x[label.key]];
          })
          .sort((x: number[], y: number[]) => x[0] - y[0])
      : [],
  }));

  return (
    <>
      <LineChart key="report-chart" title="Change Over Time" series={series} loadChartData={() => {}} setReportResultPeriod={setReportResultPeriod} />
      <div className={classnames("flex flex-col gap-7 bg-white p-7 w-full rounded-lg drop-shadow-md", "text-xl font-semibold")}>
        <div className="flex justify-between items-center">
          <h3 className="text-displayXs">{t("report_table_title")}</h3>
          <Button onClick={() => generateReport()} className="flex gap-1 px-3 py-2">
            <Icon name="plus" />
            {t("new_report")}
          </Button>
        </div>
        <CustomTable
          data={reports}
          length={length}
          isLoading={isLoading}
          hasTextCenterOnFirstColumn={true}
          columnData={columnData}
          onNextPage={handleNextPage}
          onRowClick={() => handleReportClick()}
        />
      </div>
    </>
  );
};

interface ReportTableProps {
  reportResultPeriod: FilterTimeRange;
  setReportResultPeriod: (value: FilterTimeRange) => void;
}

export default ReportTable;
