import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import useDomain from "@hooks/useDomain";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import PageSettingsModal from "./PageSettingsModal";

const Page: FC = () => {
  const router = useRouter();
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);

  const [showPageSettingsModal, setShowPageSettingsModal] = useState(false);

  const handleShowPageSettingsModal = () => {
    setShowPageSettingsModal(true);
  };

  const handleClosePageSettingsModal = () => {
    setShowPageSettingsModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-top">
        <div className="flex flex-col gap-2 mb-10">
          <Breadcrumb />
          <h3 className="text-md">
              <a href={domain?.url}>{domain?.url}</a>
            </h3>        </div>
        <Button className="mt-3" onClick={handleShowPageSettingsModal}>
          Settings
        </Button>
        <PageSettingsModal show={showPageSettingsModal} onClose={handleClosePageSettingsModal} />
      </div>
    </div>
  );
};

export default Page;
