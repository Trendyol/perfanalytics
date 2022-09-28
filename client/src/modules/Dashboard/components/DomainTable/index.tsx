import React, { FC, useState } from "react";
import clsx from "clsx";
import CustomTable from "@components/shared/CustomTable";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import { getFavicon } from "@utils/common";
import Image from "next/image";
import { useRouter } from "next/router";
import useDomainInfinite from "@hooks/useDomainInfinite";
import Button from "@components/shared/Form/Button";
import useTranslation from "next-translate/useTranslation";
import DomainModal from "../DomainModal";

const columnData = [
  {
    dataKey: "name",
    label: "Name",
    cellRenderer: (name: string, { url }: { url: string }) => (
      <div className="flex items-center gap-2">
        <Image className={clsx("w-5 h-5 bg-white rounded-full")} src={getFavicon(url)} width={20} height={20} />
        <div> {name}</div>
      </div>
    ),
  },
  {
    dataKey: "url",
    label: "# of Url",
    columnWidth: 1,
  },
  {
    dataKey: "countOfTotalReport",
    label: "# of Total Report",
    columnWidth: 1,
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    columnWidth: 1,
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
  },
  {
    dataKey: "slackChannel",
    label: "Slack Channel",
    columnWidth: 1,
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    columnWidth: 1,
  },
];

const DomainTable: FC<DomainTableProps> = (props) => {
  const [showDomainModal, setShowDomainModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("dashboard");
  const { domains, length, size, setSize, isLoading } = useDomainInfinite();

  const handleDomainClick = ({ _id }: { _id: string }) => {
    router.push(`/dashboard/${_id}`);
  };

  const handleNextPage = () => {
    setSize(size + 1);
  };

  return (
    <>
      <div className={clsx("flex flex-col gap-7", "bg-white px-9 py-6 rounded-lg drop-shadow-md", "text-xl font-semibold")}>
        <div className="flex justify-between items-center">
          <h3>{t("domains")}</h3>
          <Button onClick={() => setShowDomainModal(true)} className="px-3 py-2">
            {t("add_domain")}
          </Button>
        </div>
        <CustomTable
          data={domains}
          length={length}
          isLoading={isLoading}
          columnData={columnData}
          onNextPage={handleNextPage}
          onRowClick={({ rowData }) => handleDomainClick(rowData)}
        />
      </div>
      <DomainModal show={showDomainModal} onClose={() => setShowDomainModal(false)} />
    </>
  );
};

interface DomainTableProps {}

export default DomainTable;
