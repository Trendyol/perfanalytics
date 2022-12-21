import CustomTable from "@components/shared/CustomTable";
import Icon, { IconName } from "@components/shared/Icon";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import { MetricKey } from "@enums";
import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";
import { METRICS } from "src/constants";

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
    cellRenderer: (deviceType: string) => {
      return deviceType ? <Icon name={deviceType.toLowerCase() as IconName} className="w-5 h-5" /> : null;
    },
  },
  ...Object.keys(METRICS).map((key) => ({
    dataKey: key,
    label: METRICS[key as MetricKey].label,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  })),
];

const ReportTable: FC<ReportTableProps> = ({ reports, length, setSize, isLoading }) => {
  const { t } = useTranslation("path");

  const handleNextPage = () => {
    if (setSize) {
      setSize((previousSize: number) => previousSize + 1);
    }
  };

  return (
    <div
      className={classNames("flex flex-col gap-7 bg-white pt-7 px-7 w-full drop-shadow-md rounded-lg text-xl font-semibold", {
        "pb-7": isLoading || reports?.length === 0,
      })}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-displayXs">
          {t("report_table_title")} ({reports?.length})
        </h3>
      </div>
      <CustomTable
        data={reports}
        length={length}
        isLoading={isLoading}
        hasTextCenterOnFirstColumn={true}
        columnData={columnData}
        onNextPage={handleNextPage}
        onRowClick={() => {
          alert("Not implemented yet.");
        }}
      />
    </div>
  );
};

interface ReportTableProps {
  reports: any;
  length: number;
  setSize: (cb: (value: number) => number) => void;
  isLoading: boolean | undefined;
}

export default ReportTable;
