import CustomTable from "@components/shared/CustomTable";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import usePages from "@hooks/usePages";
import { getFavicon } from "@utils/common";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

const columnData = [
  {
    dataKey: "url",
    label: "Name",
    cellRenderer: (name: string, { url }: { url: string }) => (
      <div className="flex items-center gap-2">
        <Image alt="Url" className="bg-white rounded-full" src={getFavicon(url)} width={28} height={28} />
        <div>{name}</div>
      </div>
    ),
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    cellRenderer: (date: string) => date || "-",
  },
];

const PageTable: FC<PageTableProps> = (props) => {
  const router = useRouter();
  const { domainId, tagId } = router.query;
  const { pages, isLoading } = usePages(domainId as string, tagId as string);

  const handlePageClick = ({ _id }: { _id: string }) => {
    router.push(`/dashboard/${domainId}/${_id}`);
  };

  return (
    <CustomTable
      data={pages}
      isLoading={isLoading}
      columnData={columnData}
      onRowClick={({ rowData }) => handlePageClick(rowData)}
    />
  );
};

interface PageTableProps {}

export default PageTable;
