import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { FC, useState } from "react";
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
    <>
      <div
        className={classnames(
          "flex flex-col gap-7 bg-white px-7 pt-6 pb-0 w-full rounded-lg drop-shadow-md text-xl font-semibold"
        )}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-displayXs">{t("paths")}</h3>
          <Button onClick={handleShowPageModal} className="flex gap-1 px-3 py-2">
            <Icon name="plus" />
            {t("new_url")}
          </Button>
        </div>
        <PageTable />
      </div>
      <PageModal show={showPageModal} onClose={handleClosePageModal} />
    </>
  );
};

export default PageContainer;
