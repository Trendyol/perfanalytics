import { FC, useState } from "react";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import Button from "@components/shared/Form/Button";
import DomainSettingsModal from "./components/DomainSettingsModal";
import Breadcrumb from "@components/shared/Breadcrumb";
import InfoCardContainer from "./components/InfoCardContainer";
import PageContainer from "./components/PageContainer";

const Domain: FC = () => {
  const [showDomainSettingsModal, setShowDomainSettingsModal] = useState(false);
  const router = useRouter();
  const { domainId } = router.query;

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
        <Button onClick={handleShowDomainSettingsModal}>Settings</Button>
      </div>
      <InfoCardContainer />

      <DomainSettingsModal show={showDomainSettingsModal} onClose={handleCloseDomainSettingsModal} />

      <PageContainer />
    </div>
  );
};

export default Domain;
