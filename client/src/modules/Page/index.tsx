import { FC, useState } from "react";
import { useRouter } from "next/router";
import Button from "@components/shared/Form/Button";
import PageSettingsModal from "./PageSettingsModal";
import Breadcrumb from "@components/shared/Breadcrumb";

const Page: FC = () => {
  const router = useRouter();
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
        <div className="mb-10">
          <Breadcrumb />
          <h3 className="text-md">Example</h3>
        </div>
        <Button className="mt-3" onClick={handleShowPageSettingsModal}>
          Settings
        </Button>
        <PageSettingsModal show={showPageSettingsModal} onClose={handleClosePageSettingsModal} />
      </div>
    </div>
  );
};

export default Page;
