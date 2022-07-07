import React, { FC, useRef } from "react";
import CustomTable from "@components/shared/CustomTable";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import { useDomain } from "@hooks/useDomain";
import { getFavicon } from "@utils/common";
import Image from "next/image";

const columnData = [
  {
    dataKey: "name",
    label: "Name",
    cellRenderer: (name: string, { url }: { url: string }) => (
      <div className="flex items-center gap-2">
        <Image
          className="bg-white rounded-full"
          src={getFavicon(url)}
          width={28}
          height={28}
        />
        <div> {name}</div>
      </div>
    ),
  },
  {
    dataKey: "url",
    label: "# of Url",
    columnWidth: 250,
  },
  {
    dataKey: "countOfTotalReport",
    label: "# of Total Report",
    columnWidth: 150,
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    columnWidth: 150,
    cellRenderer: (score: number) => (
      <ScoreBadge type={getBadgeType(score)} score={score} />
    ),
  },
  {
    dataKey: "slackChannel",
    label: "Slack Channel",
    columnWidth: 200,
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    columnWidth: 200,
  },
];

const DomainTable: FC<DomainTableProps> = (props) => {
  const { data, length, size, setSize, isLoading } = useDomain();

  return (
    <div>
      <CustomTable
        data={data}
        length={length}
        isLoading={isLoading}
        columnData={columnData}
        onNextPage={() => {
          setSize(size + 1);
        }}
      />
    </div>
  );
};

interface DomainTableProps {}

export default DomainTable;
