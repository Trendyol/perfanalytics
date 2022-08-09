import { FC, useState } from "react";
import { useRouter } from "next/router";
import Button from "@components/shared/Form/Button";
import PageSettingsModal from "./PageSettingsModal";

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
      <Button onClick={() => router.back()}>Back</Button>
      <Button className="float-right" onClick={handleShowPageSettingsModal}>
        Settings
      </Button>
      <PageSettingsModal show={showPageSettingsModal} onClose={handleClosePageSettingsModal} />
    </div>
  );
};

export default Page;
