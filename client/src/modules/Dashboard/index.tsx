import React, { FC, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import DomainTable from "./components/DomainTable";
import Button from "@components/shared/Form/Button";
import DomainModal from "./components/DomainModal";
import InfoCard from "@components/shared/InfoCard";

interface HomeProps { }

const Home: FC<HomeProps> = () => {
  const { t } = useTranslation("dashboard");
  const [showDomaiModal, setShowDomainModal] = useState(false);

  const handleShowDomainModal = () => {
    setShowDomainModal(true);
  };

  const handleCloseDomainModal = () => {
    setShowDomainModal(false);
  };

  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="flex flex-col">
        <div className="flex flex-row w-full gap-5">
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4"/>
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4"/>
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4"/>
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4"/>
        </div>
        <Button onClick={handleShowDomainModal} className="self-end mb-2">
          {t("add_domain")}
        </Button>
        <DomainModal show={showDomaiModal} onClose={handleCloseDomainModal} />
        <DomainTable />
      </div>
    </div>
  );
};

export default Home;
