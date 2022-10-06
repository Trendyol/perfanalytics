import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import DangerSection from "../DangerSection";
import UpdateSection from "../GeneralForm";
import useDomain from "@hooks/useDomain";
import useDomainInfinite from "@hooks/useDomainInfinite";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { updateDomain } from "@services/domainService";
import { toast } from "react-toastify";
import { updateDomainSchema } from "@schemas";
import { DomainSettings } from "src/interfaces";

interface DomainSettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const DomainSettingsModal: FC<DomainSettingsModalProps> = ({ show, onClose }) => {
  const [updatingDomain, setUpdatingDomain] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("domain");
  const { domainId } = router.query;
  const { domain, mutateDomain } = useDomain(domainId as string);
  const { mutateDomains } = useDomainInfinite();

  const formik = useFormik({
    initialValues: { name: domain?.name || "", url: domain?.url || "" },
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: () => updateDomainSchema(t),
    onSubmit: (values, { resetForm }) => {
      handleDomainUpdate(values);
      resetForm();
    },
  });

  const handleDomainUpdate = async (values: DomainSettings) => {
    if (!domain) return;
    setUpdatingDomain(true);

    try {
      await updateDomain(domain._id, values);
      await mutateDomain();
      await mutateDomains();

      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }

    setUpdatingDomain(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("domain_settings")}>
      <UpdateSection formik={formik} />

      <div className="flex justify-end">
        <DangerSection />
        <Button color="transparent" className="mr-2">
          {t("cancel")}
        </Button>
        <Button onClick={() => formik.submitForm()} loading={updatingDomain} color="primary">
          {t("update")}
        </Button>
      </div>
    </Modal>
  );
};

export default DomainSettingsModal;
