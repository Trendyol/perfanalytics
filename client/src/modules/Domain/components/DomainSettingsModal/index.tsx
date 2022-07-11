import { FC, useState } from "react";
import Divider from "@components/shared/Divider";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import DangerSection from "../DangerForm";
import UpdateSection from "../GeneralForm";
import useDomain from "@hooks/useDomain";
import useDomainInfinite from "@hooks/useDomainInfinite";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as domainService from "@services/domainService";
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
  const { domain, updateDomain } = useDomain(domainId as string);
  const { updateDomainInfinite } = useDomainInfinite();

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
      await domainService.updateDomain(domain._id, values);
      await updateDomain(values);
      await updateDomainInfinite(domain._id, values);

      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }

    setUpdatingDomain(false);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t("domain_settings")}
      footer={
        <div className="float-right">
          <Button onClick={onClose} color="transparent" className="mr-2">
            {t("cancel")}
          </Button>
          <Button onClick={() => formik.submitForm()} loading={updatingDomain} color="secondary">
            {t("update")}
          </Button>
        </div>
      }
    >
      <Divider />
      <UpdateSection formik={formik} />
      <Divider />
      <DangerSection />
    </Modal>
  );
};

export default DomainSettingsModal;
