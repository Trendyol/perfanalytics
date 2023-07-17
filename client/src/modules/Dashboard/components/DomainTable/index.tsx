import CustomTable from "@components/shared/CustomTable";
import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";
import useDomains from "@hooks/useDomains";
import { getFavicon } from "@utils/common";
import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import DomainModal from "../DomainModal";

const columnData = [
  {
    dataKey: "name",
    label: "",
    cellRenderer: (name: string, { url }: { url: string; pathname: string }) => (
      <div className="flex items-center gap-2 px-2">
        <Image alt="Site logo" className={classnames("bg-white rounded-full")} src={getFavicon(url)} width={20} height={20} />
        <div>{name}</div>
      </div>
    ),
    columnWidth: 200,
  },
  {
    dataKey: "url",
    label: "Url",
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    cellRenderer: (score: number) => <ScoreBadge type={getBadgeType(score)} score={score} />,
    columnWidth: 200,
  },
  {
    dataKey: "countOfTotalReport",
    label: "# of Total Report",
    cellRenderer: (text: string) => text || "-",
    columnWidth: 200,
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    cellRenderer: (date: string) => date || "-",
    columnWidth: 200,
  },
];

const DomainTable: FC<DomainTableProps> = (props) => {
  const [showDomainModal, setShowDomainModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("dashboard");
  const { domains, isLoading } = useDomains();

  const handleDomainClick = ({ _id }: { _id: string }) => {
    router.push(`/dashboard/${_id}`);
  };

  return (
    <>
      <div className={classnames("flex flex-col gap-7 bg-white p-7 w-full rounded-lg drop-shadow-md", "text-xl font-semibold")}>
        <div className="flex justify-between items-center">
          <h3 className="text-displayXs">{t("domains")}</h3>
          <Button onClick={() => setShowDomainModal(true)} className="flex gap-1 px-3 py-2">
            <Icon name="plus" />
            {t("new_url")}
          </Button>
        </div>
        <CustomTable data={domains} isLoading={isLoading} columnData={columnData} onRowClick={({ rowData }) => handleDomainClick(rowData)} />
      </div>
      <DomainModal show={showDomainModal} onClose={() => setShowDomainModal(false)} />
    </>
  );
};

interface DomainTableProps {}

export default DomainTable;
