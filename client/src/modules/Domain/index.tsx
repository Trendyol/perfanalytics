import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import DomainSettingsModal from "./components/DomainSettingsModal";
import Breadcrumb from "@components/shared/Breadcrumb";
import InfoCardContainer from "./components/InfoCardContainer";
import PageContainer from "./components/PageContainer";
import useTranslation from "next-translate/useTranslation";

const Domain: FC = () => {
  const [showDomainSettingsModal, setShowDomainSettingsModal] = useState(false);
  const { t } = useTranslation("domain");

  const handleShowDomainSettingsModal = () => {
    setShowDomainSettingsModal(true);
  };

  const handleCloseDomainSettingsModal = () => {
    setShowDomainSettingsModal(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumb />
        <Button onClick={handleShowDomainSettingsModal}>{t("settings")}</Button>
      </div>
      <InfoCardContainer />

      <DomainSettingsModal show={showDomainSettingsModal} onClose={handleCloseDomainSettingsModal} />

      <PageContainer />
    </div>
  );
};

export default Domain;
