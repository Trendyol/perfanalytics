import { FC } from "react";
import TextField from "@components/shared/Form/TextField";
import { FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import { DomainSettings } from "src/interfaces";

interface GeneralFormProps {
  formik: FormikProps<DomainSettings>;
}

const GeneralForm: FC<GeneralFormProps> = ({ formik }) => {
  const { t } = useTranslation("domain");

  return (
    <form className="section w-full flex flex-col text-xl" onSubmit={formik.handleSubmit}>
      <div className="mb-3 font-semibold text-sm">{t("general")}</div>
      <TextField
        name="name"
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
    </form>
  );
};

export default GeneralForm;
