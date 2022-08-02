import { FC, useState } from "react";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import Button from "@components/shared/Form/Button";
import DomainSettingsModal from "./components/DomainSettingsModal";
import Breadcrumb from "@components/shared/Breadcrumb";
import PageTable from "./components/PageTable";
import InfoCardContainer from "./components/InfoCardContainer";
import PageModal from "./components/PageModal";
import useTranslation from "next-translate/useTranslation";

const Domain: FC = () => {
  const [showDomainSettingsModal, setShowDomainSettingsModal] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const { t } = useTranslation("domain");
  const router = useRouter();
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);

  const handleShowDomainSettingsModal = () => {
    setShowDomainSettingsModal(true);
  };

  const handleCloseDomainSettingsModal = () => {
    setShowDomainSettingsModal(false);
  };

  const handleShowPageModal = () => {
    setShowPageModal(true);
  };

  const handleClosePageModal = () => {
    setShowPageModal(false);
  };

  return (
    <div>
      <Breadcrumb />
      <Button onClick={() => router.back()}>Back</Button>
      <Button className="float-right" onClick={handleShowDomainSettingsModal}>
        Settings
      </Button>
      <DomainSettingsModal show={showDomainSettingsModal} onClose={handleCloseDomainSettingsModal} />
      <div>{domain?.name}</div>
      <div>{domain?.url}</div>
      <InfoCardContainer />
      <Button onClick={handleShowPageModal} className="self-end mb-2">
        {t("add_page")}
      </Button>
      <PageModal show={showPageModal} onClose={handleClosePageModal} />
      <PageTable />
    </div>
  );
};

export default Domain;
