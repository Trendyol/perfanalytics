import CustomTable from "@components/shared/CustomTable";
import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import useReportsInfinite from "@hooks/useReportsInfinite";
import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useRef } from "react";

const columnData = [
  {
    dataKey: "createdAt",
    label: "Report Date",
    columnWidth: 1,
  },

  {
    dataKey: "device",
    label: "Device",
  },
  {
    dataKey: "first-contentful-paint",
    label: "First Contentful Paint",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "speed-index",
    label: "Speed Index",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "largest-contentful-paint",
    label: "Largest Contentful Paint",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "interactive",
    label: "Time to Interactive",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "total-blocking-time",
    label: "Total Blocking Time",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "cumulative-layout-shift",
    label: "Cumulative Layout Shift",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "first-meaningful-paint",
    label: "First Meaningful Paint",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "status",
    label: "Status",
  },
];

const ReportTable: FC<ReportTableProps> = () => {
  const { t } = useTranslation("path");
  const router = useRouter();
  const { pageId } = router.query;
  const initialDate = useRef(new Date());

  const { reports, length, size, setSize, isLoading } = useReportsInfinite(pageId as string, initialDate.current, 10);

  const handleReportClick = ({ _id }: { _id: string }) => {
    // router.push(`/dashboard/${_id}?tagId=${DEFAULT_TAG.id}`);
    // TODO: report sayfasinin linkini sor
  };

  const handleNextPage = () => {
    setSize(size + 1);
  };

  const generateReport = () => {};

  if (!reports) {
    return null;
  }

  return (
    <>
      <div className={classnames("flex flex-col gap-7 bg-white p-7 w-full rounded-lg drop-shadow-md", "text-xl font-semibold")}>
        <div className="flex justify-between items-center">
          <h3 className="text-displayXs">{t("report_table_title")}</h3>
          <Button onClick={() => generateReport()} className="flex gap-1 px-3 py-2">
            <Icon name="plus" />
            {t("new_report")}
          </Button>
        </div>
        <CustomTable
          data={reports!}
          length={length}
          isLoading={isLoading}
          hasTextCenterOnFirstColumn={true}
          columnData={columnData}
          onNextPage={handleNextPage}
          onRowClick={({ rowData }) => handleReportClick(rowData)}
        />
      </div>
    </>
  );
};

interface ReportTableProps {}

export default ReportTable;
