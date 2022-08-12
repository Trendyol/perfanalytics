import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { updatePassword } from "@services/userService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { passwordUpdateSchema } from "@schemas";

interface PasswordFormProps {}

const PasswordForm: FC<PasswordFormProps> = () => {
  const { t } = useTranslation("layout");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handlePasswordUpdate = async (values: { oldPassword: string; newPassword: string }) => {
    setUpdatingPassword(true);
    try {
      await updatePassword(values);
      toast.success(t("success"));
    } catch {
      toast.error(t("error"));
    }
    setUpdatingPassword(false);
  };

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validateOnChange: false,
    validationSchema: () => passwordUpdateSchema(t),
    onSubmit: (values, { resetForm }) => {
      handlePasswordUpdate(values);
      resetForm();
    },
  });

  return (
    <form className="section w-full flex flex-col gap-3 text-medium" onSubmit={formik.handleSubmit}>
      <div className="font-semibold text-sm">{t("update_password")}</div>
      <TextField
        name="oldPassword"
        type="password"
        placeholder={t("current_password")}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.oldPassword}
        error={formik.touched.oldPassword && formik.errors.oldPassword}
      />
      <TextField
        name="newPassword"
        type="password"
        placeholder={t("new_password")}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPassword}
        error={formik.touched.newPassword && formik.errors.newPassword}
      />
      <TextField
        name="confirmPassword"
        type="password"
        placeholder={t("confirm_password")}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
      <Button loading={updatingPassword} color="primary" className="ml-auto mt-2">
        {t("update")}
      </Button>
    </form>
  );
};

export default PasswordForm;
