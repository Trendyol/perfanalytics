import Breadcrumb from "@components/shared/Breadcrumb";
import Button from "@components/shared/Form/Button";
import Icon from "@components/shared/Icon";
import usePage from "@hooks/usePage";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import PathSettingsModal from "../PathSettingsModal";

const PathPageHeader: FC<PathPageHeaderProps> = () => {
  const [showPathSettingsModal, setShowPathSettingsModal] = useState(false);
  const { query } = useRouter();
  const { t } = useTranslation("path");

  const { page } = usePage(query.pageId as string);

  const generateReport = () => {
    alert("Not implemented yet.");
  };

  return (
    <div className="flex justify-between items-top">
      <div className="flex flex-col gap-2">
        <Breadcrumb />
        <h3 className="text-md h-6">
          <a href={page?.url} target="_blank">
            {page?.url}
          </a>
        </h3>
      </div>
      <div className="mt-2 flex gap-3">
        <Button onClick={generateReport} className="flex gap-1 px-3 py-2">
          <Icon name="plus" />
          {t("new_report")}
        </Button>{" "}
        <Button onClick={() => setShowPathSettingsModal(true)}>{t("settings")}</Button>
      </div>
      <PathSettingsModal show={showPathSettingsModal} onClose={() => setShowPathSettingsModal(false)} />
    </div>
  );
};

interface PathPageHeaderProps {}

export default PathPageHeader;
