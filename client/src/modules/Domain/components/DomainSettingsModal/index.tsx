import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useDomain from "@hooks/useDomain";
import useDomains from "@hooks/useDomainInfinite";
import { updateDomainSchema } from "@schemas";
import { updateDomain } from "@services/domainService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { DomainSettings } from "src/interfaces";
import DangerSection from "../DangerSection";
import UpdateSection from "../GeneralForm";

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
  const { mutateDomains } = useDomains();

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

      toast.success(t("success") as string);
      onClose();
    } catch (error) {
      toast.error(t("error") as string);
    }

    setUpdatingDomain(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("domain_settings")}>
      <UpdateSection formik={formik} />
      <div className="flex justify-end">
        <DangerSection />
        <Button color="transparent" onClick={onClose} className="mr-2">
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
