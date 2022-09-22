import React, { FC, useState } from "react";
import DomainTable from "./components/DomainTable";
import Button from "@components/shared/Form/Button";
import DomainModal from "./components/DomainModal";
import InfoCardContainer from "./components/InfoCardContainer";
import useTranslation from "next-translate/useTranslation";
import Breadcrumb from "@components/shared/Breadcrumb";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { t } = useTranslation("dashboard");
  const [showDomainModal, setShowDomainModal] = useState(false);

  const handleShowDomainModal = () => {
    setShowDomainModal(true);
  };

  const handleCloseDomainModal = () => {
    setShowDomainModal(false);
  };

  return (
    <div className="min-h-full">
      <Breadcrumb />
      <div className="flex flex-col">
        <InfoCardContainer />
        <DomainModal show={showDomainModal} onClose={handleCloseDomainModal} />
        <DomainTable />
      </div>
    </div>
  );
};

export default Home;
