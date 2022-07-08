import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import useDomainInfinite from "@hooks/useDomainInfinite";
import { addDomainSchema } from "@schemas";
import { createDomain } from "@services/domainService";
import { getDomainKey } from "@utils/swr";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

interface DomainModalProps {
  show: boolean;
  onClose: () => void;
}

const DomainModal: FC<DomainModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("dashboard");
  const [addingDomain, setAddingDomain] = useState(false);
  const { domains, mutateDomains, length } = useDomainInfinite();
  const { cache } = useSWRConfig();

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
      await createDomain(values);
      mutateDomains(
        [{ docs: [values, ...domains], totalDocs: length + 1 }],
        false
      );

      cache.set(getDomainKey(0), {
        docs: [values, ...domains.slice(10)],
        totalDocs: length + 1,
      });

      onClose();
    } catch (error) {
      toast.error(t("error"));
    }

    setAddingDomain(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("add_domain")}>
      <form
        className="section w-full flex flex-col text-xl"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          name="name"
          className="mt-3"
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
        <Button
          loading={addingDomain}
          type="submit"
          color="secondary"
          className="ml-auto"
        >
          {t("add")}
        </Button>
      </form>
    </Modal>
  );
};

export default DomainModal;
