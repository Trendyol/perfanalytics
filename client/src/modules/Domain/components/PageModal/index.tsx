import Button from "@components/shared/Form/Button";
import Select from "@components/shared/Form/Select";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import { DeviceOptions } from "@constants";
import useDashboardMetric from "@hooks/useDashboardMetric";
import useDomain from "@hooks/useDomain";
import usePages from "@hooks/usePages";
import useTags from "@hooks/useTag";
import { TagResponse } from "src/interfaces";
import { addPageSchema } from "@schemas";
import { createPage } from "@services/pageService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";

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
  const { tags } = useTags(domainId as string);
  const { mutatePages } = usePages(domainId as string, tagId as string);
  const { mutateDashboardMetrics } = useDashboardMetric(domainId as string);

  const formik = useFormik({
    initialValues: { domainId: domainId as string, url: "", device: "", tagId: "" },
    validateOnChange: false,
    validationSchema: () => addPageSchema(t),
    onSubmit: (values, { resetForm }) => {
      handlePageAdd(values);
      resetForm();
    },
  });

  const handlePageAdd = async (values: { domainId: string; url: string; device: string; tagId: string }) => {
    setAddingPage(true);
    values.url = domain?.url + values.url;

    try {
      await createPage(values);
      mutatePages();
      mutateDashboardMetrics();
      toast.success(t("success") as string);
      onClose();
    } catch (error) {
      toast.error(t("error") as string);
    }
    setAddingPage(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("add_path")}>
      <form className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("path_url")}</h5>
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
          <Select
            name="device"
            defaultText="Select device type"
            options={DeviceOptions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.device}
            error={formik.touched.device && formik.errors.device}
            labelProperty="label"
            valueProperty="value"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("tagId")}</h5>
          <Select
            name="tagId"
            defaultText="Select device type"
            options={tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tagId}
            error={formik.touched.tagId && formik.errors.tagId}
            labelProperty="name"
            valueProperty="id"
          />
        </div>
      </form>
      <div className="flex ml-auto">
        <Button onClick={onClose} type="submit" color="transparent" className="mr-2">
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          loading={addingPage}
          type="submit"
          color="primary"
        >
          {t("add")}
        </Button>
      </div>
    </Modal>
  );
};

export default PageModal;
