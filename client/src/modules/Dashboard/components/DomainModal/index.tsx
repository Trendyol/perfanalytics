import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import useDomainInfinite from "@hooks/useDomainInfinite";
import { addDomainSchema } from "@schemas";
import { createDomain } from "@services/domainService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import useDashboardMetric from "@hooks/useDashboardMetric";

interface DomainModalProps {
  show: boolean;
  onClose: () => void;
}

const DomainModal: FC<DomainModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("dashboard");
  const [addingDomain, setAddingDomain] = useState(false);
  const { domains, mutateDomains, length } = useDomainInfinite();
  const { mutateDashboardMetrics } = useDashboardMetric();
  
  const formik = useFormik({
    initialValues: { name: "", url: "" },
    validateOnChange: false,
    validationSchema: () => addDomainSchema(t),
    onSubmit: (values, { resetForm }) => {
      handleDomainAdd(values);
      resetForm();
    },
  });

  const handleDomainAdd = async (values: { name: string; url: string }) => {
    setAddingDomain(true);

    try {
      const result = await createDomain(values);
      mutateDomains([{ docs: [result.data, ...domains], totalDocs: length + 1 }], false);
      mutateDashboardMetrics();
      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }

    setAddingDomain(false);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t("add_domain")}
      footer={
        <div className="flex justify-end">
          <Button onClick={onClose} type="submit" color="transparent" className="mr-2">
            {t("cancel")}
          </Button>
          <Button onClick={() => formik.handleSubmit()} loading={addingDomain} type="submit" color="primary">
            {t("add")}
          </Button>
        </div>
      }
    >
      <form className="section w-full flex flex-col gap-3 text-xl">
        <TextField
          name="name"
          placeholder={t("name")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="url"
          placeholder={t("domain_url")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          error={formik.touched.url && formik.errors.url}
        />
      </form>
    </Modal>
  );
};

export default DomainModal;
