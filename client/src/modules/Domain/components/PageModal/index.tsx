import { FC, useState } from "react";
import Divider from "@components/shared/Divider";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import { addPageSchema } from "@schemas";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import { createPage } from "@services/pageService";
import usePageInfinite from "@hooks/usePageInfinite";
import { useRouter } from "next/router";

interface PageModalProps {
  show: boolean;
  onClose: () => void;
}

const PageModal: FC<PageModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("domain");
  const [addingPage, setAddingPage] = useState(false);
  const { pages, mutatePages, length } = usePageInfinite();
  const router = useRouter();
  const { domainId } = router.query;

  const formik = useFormik({
    initialValues: { domainId: domainId as string, url: "", device: "" },
    validateOnChange: false,
    validationSchema: () => addPageSchema(t),
    onSubmit: (values, { resetForm }) => {
      handlePageAdd(values);
      resetForm();
    },
  });

  const handlePageAdd = async (values: { domainId: string; url: string; device: string }) => {
    setAddingPage(true);

    try {
      const result = await createPage(values);
      mutatePages([{ docs: [result.data, ...pages], totalDocs: length + 1 }], false);
      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }
    setAddingPage(false);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t("new_url")}
      footer={
        <div className="float-right">
          <Button onClick={onClose} type="submit" color="transparent" className="mr-2">
            {t("cancel")}
          </Button>
          <Button onClick={() => formik.handleSubmit()} loading={addingPage} type="submit" color="secondary">
            {t("add")}
          </Button>
        </div>
      }
    >
      <Divider />
      <form className="section w-full flex flex-col text-xl">
        <TextField
          name="url"
          placeholder={t("page_url")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          error={formik.touched.url && formik.errors.url}
        />
        <TextField
          name="device"
          className="mt-3"
          placeholder={t("device")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.device}
          error={formik.touched.device && formik.errors.device}
        />
      </form>
    </Modal>
  );
};

export default PageModal;
