import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import { tagSchema } from "@schemas";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import ColorPicker from "@components/shared/ColorPicker";
import { HttpCodes, TagAction } from "@enums";
import { createTag, deleteTag, editTag } from "@services/tagService";
import { Tag } from "@interfaces";
import { useRouter } from "next/router";
import useTags from "@hooks/useTag";

interface TagModalProps {
  type: "add" | "edit";
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
    initialValues: { name: tag?.name ?? "", checkedColor: tag?.color ?? "" , isDefaultTag: tag?.isDefaultTag },
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: () => tagSchema(t),
    onSubmit: (config, helpers) => {
      helpers.resetForm();
    },
  });

  const handleDefaultTagDeleteAction = () => {
    toast.error(t("default_tag_can_not_be_deleted"));
    onClose();
    setIsProcessContinue(false);
  }

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
            isDefaultTag: false,
          });
          break;
          case TagAction.EDIT:
          result = await editTag({
            id: tag!.id,
            name: formik.values.name,
            color: formik.values.checkedColor,
          });
          break;
        case TagAction.DELETE:
          if(formik.values.isDefaultTag) return handleDefaultTagDeleteAction();
          result = await deleteTag(tag!.id);
          break;
        default:
          break;
      }

      if ([HttpCodes.OK, HttpCodes.CREATED].includes(result?.status!)) {
        toast.success(t("success"));
        mutateTag();
        formik.resetForm();
        onClose();
      } else {
        toast.error(t("error"));
      }
    } catch (error) {
      toast.error(t("error"));
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
        {type === "edit" && (
          <Button onClick={() => handleTagActionClick(TagAction.DELETE)} type="submit" color="danger" size="medium">
            {t("delete")}
          </Button>
        )}
        <Button onClick={onClose} type="submit" color="transparent" size="medium" className="ml-auto mr-2">
          {t("cancel")}
        </Button>
        <Button
          onClick={() => handleTagActionClick(type === "add" ? TagAction.ADD : TagAction.EDIT)}
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
