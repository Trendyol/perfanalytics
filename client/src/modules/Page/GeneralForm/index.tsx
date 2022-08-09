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
    <form className="section w-full flex flex-col text-xl" onSubmit={formik.handleSubmit}>
      <div className="mb-3 font-semibold text-sm">{t("general")}</div>
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
        placeholder={t("device")}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.device}
        error={formik.touched.device && formik.errors.device}
      />
    </form>
  );
};

export default GeneralForm;
