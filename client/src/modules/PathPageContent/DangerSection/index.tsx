import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useDashboardCount from "@hooks/useDashboardCount";
import usePage from "@hooks/usePage";
import usePages from "@hooks/usePages";
import { deletePage } from "@services/pageService";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

const DangerForm = () => {
  const router = useRouter();
  const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);
  const [deletingPage, setDeletingPage] = useState(false);
  const { pageId, domainId } = router.query;
  const { page } = usePage(pageId as string);
  const { mutatePages } = usePages(domainId as string);
  const { mutateDashboardCount } = useDashboardCount(domainId as string);
  const { t } = useTranslation("path");

  const handleCloseVerifyDeleteModal = () => {
    setShowVerifyDeleteModal(false);
  };

  const handleDeletePage = async () => {
    if (!page) return;
    setDeletingPage(true);
    await deletePage(page._id);
    await mutatePages();
    await mutateDashboardCount();
    router.push(`/dashboard/${domainId}`);
  };

  return (
    <>
      <Button color="danger" className="mr-auto" onClick={() => setShowVerifyDeleteModal(true)}>
        {t("delete")}
      </Button>
      <Modal title={t("danger")} show={showVerifyDeleteModal} onClose={() => setShowVerifyDeleteModal(false)}>
        <div>{t("verify_delete")}</div>
        <div className="w-full flex mt-4">
          <div className="flex ml-auto">
            <Button onClick={handleCloseVerifyDeleteModal} className="mr-2" color="transparent">
              {t("cancel")}
            </Button>
            <Button loading={deletingPage} color="danger" onClick={handleDeletePage}>
              {t("delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DangerForm;
