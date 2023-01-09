import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import useDomain from "@hooks/useDomain";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import DomainSettingsModal from "./components/DomainSettingsModal";
import InfoCardContainer from "./components/InfoCardContainer";
import PageContainer from "./components/PageContainer";

const Domain: FC = () => {
  const [showDomainSettingsModal, setShowDomainSettingsModal] = useState(false);

  const router = useRouter();
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);
  const { t } = useTranslation("domain");

  const handleShowDomainSettingsModal = () => {
    setShowDomainSettingsModal(true);
  };

  const handleCloseDomainSettingsModal = () => {
    setShowDomainSettingsModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-top mb-10">
        <div className="flex flex-col gap-2">
          <Breadcrumb />
          <h3 className="text-md h-6">
            <a href={domain?.url} target="_blank">
              {domain?.url}
            </a>
          </h3>
        </div>
        <Button className="mt-3" onClick={handleShowDomainSettingsModal}>
          {t("settings")}
        </Button>
      </div>
      <InfoCardContainer />
      <PageContainer />
      <DomainSettingsModal show={showDomainSettingsModal} onClose={handleCloseDomainSettingsModal} />
    </div>
  );
};

export default Domain;
