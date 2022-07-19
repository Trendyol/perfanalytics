import { FC, useState } from "react";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import Button from "@components/shared/Form/Button";
import DomainSettingsModal from "./components/DomainSettingsModal";
import Breadcrumb from "@components/shared/Breadcrumb";

const Domain: FC = () => {
  const [showDomainSettingsModal, setShowDomainSettingsModal] = useState(false);
  const router = useRouter();
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);

  const handleShowDomainSettingsModal = () => {
    setShowDomainSettingsModal(true);
  };

  const handleCloseDomainSettingsModal = () => {
    setShowDomainSettingsModal(false);
  };

  return (
    <div>
      <Breadcrumb/>
      <Button onClick={() => router.back()}>Back</Button>
      <Button className="float-right" onClick={handleShowDomainSettingsModal}>
        Settings
      </Button>
      <DomainSettingsModal show={showDomainSettingsModal} onClose={handleCloseDomainSettingsModal} />
      <div>{domain?.name}</div>
      <div>{domain?.url}</div>
    </div>
  );
};

export default Domain;
