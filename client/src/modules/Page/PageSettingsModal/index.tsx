import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import usePage from "@hooks/usePage";
import DangerSection from "../DangerSection";
import UpdateSection from "../GeneralForm";
import usePageInfinite from "@hooks/usePageInfinite";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { updatePage } from "@services/pageService";
import { toast } from "react-toastify";
import { updatePageSchema } from "@schemas";
import { PageSettings } from "src/interfaces";

interface PageSettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const PageSettingsModal: FC<PageSettingsModalProps> = ({ show, onClose }) => {
  const [updatingPage, setUpdatingPage] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("page");
  const { pageId, domainId } = router.query;
  const { page, mutatePage } = usePage(pageId as string);
  const { mutatePages } = usePageInfinite(domainId as string);

  const formik = useFormik({
    initialValues: { url: page?.url || "", device: page?.device || "" },
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: () => updatePageSchema(t),
    onSubmit: (values, { resetForm }) => {
      handlePageUpdate(values);
      resetForm();
    },
  });

  const handlePageUpdate = async (values: PageSettings) => {
    if (!page) return;
    setUpdatingPage(true);

    try {
      await updatePage(page._id, values);
      await mutatePage();
      await mutatePages();

      toast.success(t("success"));
      onClose();
    } catch (error) {
      toast.error(t("error"));
    }

    setUpdatingPage(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t("page_settings")}>
      <UpdateSection formik={formik} />
      <div className="flex">
        <DangerSection />
        <Button color="transparent" className="mr-2">
          {t("cancel")}
        </Button>
        <Button onClick={() => formik.submitForm()} loading={updatingPage} color="primary">
          {t("update")}
        </Button>
      </div>
    </Modal>
  );
};

export default PageSettingsModal;
