import { FC } from "react";
import TextField from "@components/shared/Form/TextField";
import { FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import { PageSettings } from "src/interfaces";

interface GeneralFormProps {
  formik: FormikProps<PageSettings>;
}

const GeneralForm: FC<GeneralFormProps> = ({ formik }) => {
  const { t } = useTranslation("page");

  return (
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("page_url")}</h5>
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
        <TextField
          name="device"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.device}
          error={formik.touched.device && formik.errors.device}
        />
      </div>
    </form>
  );
};

export default GeneralForm;
