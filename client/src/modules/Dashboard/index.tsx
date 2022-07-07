import React, { FC, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import DomainTable from "./components/DomainTable";
import Button from "@components/shared/Form/Button";
import DomainModal from "./components/DomainModal";

interface HomeProps {}

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
