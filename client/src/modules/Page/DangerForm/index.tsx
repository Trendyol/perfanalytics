import { useState } from "react";
import Divider from "@components/shared/Divider";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import usePage from "@hooks/usePage";
import usePageInfinite from "@hooks/usePageInfinite";
import { deletePage } from "@services/pageService";
import useDashboardMetric from "@hooks/useDashboardMetric";

const DangerForm = () => {
  const router = useRouter();
  const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);
  const [deletingPage, setDeletingPage] = useState(false);
  const { pageId, domainId } = router.query;
  const { page } = usePage(pageId as string);
  const { mutatePages } = usePageInfinite(domainId as string);
  const { mutateDashboardMetrics } = useDashboardMetric(domainId as string);
  const { t } = useTranslation("page");

  const handleCloseVerifyDeleteModal = () => {
    setShowVerifyDeleteModal(false);
  };

  const handleDeletePage = async () => {
    if (!page) return;
    setDeletingPage(true);
    await deletePage(page._id);
    await mutatePages();
    await mutateDashboardMetrics();
    router.push(`/dashboard/${domainId}`);
  };

  return (
    <>
      <div className="mb-3 font-semibold text-sm">{t("danger")}</div>
      <div className="w-full">
        <Button color="danger" className="ml-auto" onClick={() => setShowVerifyDeleteModal(true)}>
          {t("delete")}
        </Button>
      </div>
      <Divider />
      <Modal show={showVerifyDeleteModal} onClose={() => setShowVerifyDeleteModal(false)}>
        <div>{t("verify_delete")}</div>
        <div className="w-full flex mt-4">
          <div className="ml-auto">
            <Button onClick={handleCloseVerifyDeleteModal} className="mr-2" color="secondary">
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
