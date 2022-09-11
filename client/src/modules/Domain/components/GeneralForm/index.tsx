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
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
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
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("domain_url")}</h5>
        <TextField
          name="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          error={formik.touched.url && formik.errors.url}
        />
      </div>
    </form>
  );
};

export default GeneralForm;
