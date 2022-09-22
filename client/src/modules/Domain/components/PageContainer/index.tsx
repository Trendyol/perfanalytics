import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import useTranslation from "next-translate/useTranslation";
import PageModal from "../PageModal";
import PageTable from "../PageTable";

const PageContainer: FC = ({}) => {
  const [showPageModal, setShowPageModal] = useState(false);
  const { t } = useTranslation("domain");

  const handleShowPageModal = () => {
    setShowPageModal(true);
  };

  const handleClosePageModal = () => {
    setShowPageModal(false);
  };
  
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between p-2 px-0">
        <span className="text-3xl">{t("paths")}</span>
        <Button onClick={handleShowPageModal} className="self-end mb-2">
          {t("new_url")}
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <PageModal show={showPageModal} onClose={handleClosePageModal} />
        <PageTable />
      </div>
    </div>
  );
};

export default PageContainer;
