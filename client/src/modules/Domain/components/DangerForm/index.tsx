import { useState } from "react";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import { deleteDomain } from "@services/domainService";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import useDomainInfinite from "@hooks/useDomainInfinite";

const DangerForm = () => {
  const router = useRouter();
  const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);
  const [deletingDomain, setDeletingDomain] = useState(false);
  const { domainId } = router.query;
  const { domain } = useDomain(domainId as string);
  const { mutateDomains } = useDomainInfinite();
  const { t } = useTranslation("domain");

  const handleCloseVerifyDeleteModal = () => {
    setShowVerifyDeleteModal(false);
  };

  const handleDeleteDomain = async () => {
    if (!domain) return;
    setDeletingDomain(true);
    await deleteDomain(domain._id);
    await mutateDomains();
    router.push("/");
  };

  return (
    <>
      <div className="mb-3 font-semibold text-sm">{t("danger")}</div>
      <div className="w-full">
        <Button color="danger" className="ml-auto" onClick={() => setShowVerifyDeleteModal(true)}>
          {t("delete")}
        </Button>
      </div>
      <Modal show={showVerifyDeleteModal} onClose={() => setShowVerifyDeleteModal(false)}>
        <div>{t("verify_delete")}</div>
        <div className="w-full flex mt-4">
          <div className="ml-auto">
            <Button onClick={handleCloseVerifyDeleteModal} className="mr-2" color="secondary">
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

export default DangerForm;
