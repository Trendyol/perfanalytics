import React, { FC } from "react";
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
      <div className="flex items-center">
        {/* <Image
          className="bg-white rounded-full"
          src={getFavicon(url)}
          width={24}
          height={24}
        /> */}
        <div className="ml-2"> {name}</div>
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
        onNextPage={() => setSize(size + 1)}
        isLoading={isLoading}
        length={length}
        columnData={columnData}
        data={data}
      />
    </div>
  );
};

interface DomainTableProps {}

export default DomainTable;
