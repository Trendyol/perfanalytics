import ColorPicker from "@components/shared/ColorPicker";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import { HttpCodes, TagAction } from "@enums";
import useTags from "@hooks/useTag";
import { Tag } from "@interfaces";
import { tagSchema } from "@schemas";
import { createTag, deleteTag, updateTag } from "@services/tagService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface TagModalProps {
  type: "add" | "update";
  show: boolean;
  tag?: Tag;
  onClose: () => void;
}

const TagModal: FC<TagModalProps> = ({ type, show, tag, onClose }) => {
  const [isProcessContinue, setIsProcessContinue] = useState(false);
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const { domainId } = router.query;
  const { mutateTag } = useTags(domainId as string);

  const formik = useFormik({
    initialValues: { name: tag?.name ?? "", checkedColor: tag?.color ?? "", readonly: tag?.readonly },
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: () => tagSchema(t),
    onSubmit: (config, helpers) => {
      helpers.resetForm();
    },
  });

  const handleDefaultTagDeleteAction = () => {
    toast.error(t("default_tag_can_not_be_deleted") as string);
    onClose();
    setIsProcessContinue(false);
  };

  const handleTagActionClick = async (submitAction: TagAction) => {
    setIsProcessContinue(true);
    let result;

    try {
      switch (submitAction) {
        case TagAction.ADD:
          result = await createTag({
            name: formik.values.name,
            color: formik.values.checkedColor,
            domainId: domainId as string,
            readonly: false,
          });
          break;
        case TagAction.UPDATE:
          if (!formik.values.name) return;
          result = await updateTag({
            id: tag!.id,
            name: formik.values.name,
            color: formik.values.checkedColor,
          });
          break;
        case TagAction.DELETE:
          if (formik.values.readonly) return handleDefaultTagDeleteAction();
          result = await deleteTag(tag!.id);
          break;
        default:
          break;
      }

      if ([HttpCodes.OK, HttpCodes.CREATED].includes(result?.status!)) {
        toast.success(t("success") as string);
        mutateTag && mutateTag();
        formik.resetForm();
        onClose();
      } else {
        toast.error(t("error") as string);
      }
    } catch (error) {
      toast.error(t("error") as string);
    }

    setIsProcessContinue(false);
  };

  return (
    <Modal show={show} onClose={onClose} title={t(`${type}_tag`)}>
      <form className="section w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("color")}</h5>
          <ColorPicker checkedColor={formik.values.checkedColor} onChange={(x) => formik.setFieldValue("checkedColor", x)} />
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-[14px] font-medium text-gray-500">{t("name")}</h5>
          <TextField
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
        </div>
      </form>
      <div className="flex justify-end">
        {type === "update" && (
          <Button onClick={() => handleTagActionClick(TagAction.DELETE)} type="submit" color="danger" size="medium">
            {t("delete")}
          </Button>
        )}
        <Button onClick={onClose} type="submit" color="transparent" size="medium" className="ml-auto mr-2">
          {t("cancel")}
        </Button>
        <Button
          onClick={() => handleTagActionClick(type === "add" ? TagAction.ADD : TagAction.UPDATE)}
          loading={isProcessContinue}
          type="submit"
          color="primary"
          size="medium"
        >
          {t(type)}
        </Button>
      </div>
    </Modal>
  );
};

export default TagModal;
