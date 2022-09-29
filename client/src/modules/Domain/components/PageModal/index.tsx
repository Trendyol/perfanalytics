import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useDomain from "@hooks/useDomain";
import usePageInfinite from "@hooks/usePageInfinite";
import { addPageSchema } from "@schemas";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import { createPage } from "@services/pageService";
import usePageInfinite from "@hooks/usePageInfinite";
import { useRouter } from "next/router";
import useDashboardMetric from "@hooks/useDashboardMetric";

interface PageModalProps {
  show: boolean;
  onClose: () => void;
}

const PageModal: FC<PageModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("domain");
  const [addingPage, setAddingPage] = useState(false);
  const router = useRouter();
  const { domainId, tagId } = router.query;
  const { domain } = useDomain(domainId as string);

  const { pages, mutatePages, length } = usePageInfinite(domainId as string, tagId  as string);
  const { mutateDashboardMetrics } = useDashboardMetric(domainId as string);

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

    values.url = domain?.url + values.url

    try {
      const result = await createPage(values);
      mutatePages([{ docs: [result.data, ...pages], totalDocs: length + 1 }], false);
      mutateDashboardMetrics();
      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }
    setAddingPage(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("add_path")}>
      <form className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("page_url")}</h5>
          <TextField
            name="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            prefix={domain?.url}
            value={formik.values.url}
            error={formik.touched.url && formik.errors.url}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("device")}</h5>
          <TextField
            name="device"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.device}
            error={formik.touched.device && formik.errors.device}
          />
        </div>
      </form>
      <div className="flex ml-auto">
        <Button onClick={onClose} type="submit" color="transparent" className="mr-2">
          {t("cancel")}
        </Button>
        <Button onClick={() => formik.handleSubmit()} loading={addingPage} type="submit" color="primary">
          {t("add")}
        </Button>
      </div>
    </Modal>
  );
};

export default PageModal;
