import React, { FC } from "react";
import CustomTable from "@components/shared/CustomTable";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import { getFavicon } from "@utils/common";
import Image from "next/image";
import { useRouter } from "next/router";
import usePageInfinite from "@hooks/usePageInfinite";

const columnData = [
  {
    dataKey: "url",
    label: "Name",
    cellRenderer: (name: string, { url }: { url: string }) => (
      <div className="flex items-center gap-2">
        <Image className="bg-white rounded-full" src={getFavicon(url)} width={28} height={28} />
        <div>{name}</div>
      </div>
    ),
  },
  {
    dataKey: "avgFcp",
    label: "Avg FCP",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgSi",
    label: "Avg SI",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgLcp",
    label: "Avg LCP",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgTti",
    label: "Avg TTI",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgTbt",
    label: "Avg TBT",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgCls",
    label: "Avg CLS",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgFmp",
    label: "Avg FMP",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "avgPerf",
    label: "Avg PERF",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    columnWidth: 100,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    columnWidth: 200,
  },
];

const PageTable: FC<PageTableProps> = (props) => {
  const router = useRouter();
  const { pages, length, size, setSize, isLoading } = usePageInfinite();
  const { domainId } = router.query;

  const handlePageClick = ({ _id }: { _id: string }) => {
    router.push(`/dashboard/${domainId}/${_id}`);
  };

  const handleNextPage = () => {
    setSize(size + 1);
  };

  return (
    <div>
      <CustomTable
        data={pages}
        length={length}
        isLoading={isLoading}
        columnData={columnData}
        onNextPage={handleNextPage}
        onRowClick={({ rowData }) => handlePageClick(rowData)}
      />
    </div>
  );
};

interface PageTableProps {}

export default PageTable;
