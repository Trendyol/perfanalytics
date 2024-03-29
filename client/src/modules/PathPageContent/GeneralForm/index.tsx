import Select from "@components/shared/Form/Select";
import TextField from "@components/shared/Form/TextField";
import { FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";
import { PathSettings } from "src/interfaces";
import { useRouter } from "next/router";
import useTags from "@hooks/useTag";
import { TagResponse } from "src/interfaces";
import { DeviceOptions } from "@constants";

interface GeneralFormProps {
  formik: FormikProps<PathSettings>;
}

const GeneralForm: FC<GeneralFormProps> = ({ formik }) => {
  const router = useRouter();
  const { domainId } = router.query;
  const { tags } = useTags(domainId as string);
  const { t } = useTranslation("path");

  return (
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("path_url")}</h5>
        <TextField
          name="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          defaultText="Select tag"
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
  );
};

export default GeneralForm;
