import { useState } from "react";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import { deleteDomain } from "@services/domainService";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import useDomains from "@hooks/useDomains";
import useDashboardMetric from "@hooks/useDashboardMetric";

const DangerSection = () => {
  const router = useRouter();
  const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);
  const [deletingDomain, setDeletingDomain] = useState(false);
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);
  const { mutateDomains } = useDomains();
  const { t } = useTranslation("domain");
  const { mutateDashboardMetrics } = useDashboardMetric();

  const handleCloseVerifyDeleteModal = () => {
    setShowVerifyDeleteModal(false);
  };

  const handleDeleteDomain = async () => {
    if (!domain) return;
    setDeletingDomain(true);
    await deleteDomain(domain._id);
    await mutateDomains();
    await mutateDashboardMetrics();
    router.push("/");
  };

  return (
    <>
      <Button className="mr-auto" color="danger" onClick={() => setShowVerifyDeleteModal(true)}>
        {t("delete")}
      </Button>
      <Modal title={t("danger")} show={showVerifyDeleteModal} onClose={() => setShowVerifyDeleteModal(false)}>
        <div>{t("verify_delete")}</div>
        <div className="w-full flex mt-4">
          <div className="flex ml-auto">
            <Button onClick={handleCloseVerifyDeleteModal} className="mr-2" color="transparent">
              {t("cancel")}
            </Button>
            <Button loading={deletingDomain} color="danger" onClick={handleDeleteDomain}>
              {t("delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DangerSection;
