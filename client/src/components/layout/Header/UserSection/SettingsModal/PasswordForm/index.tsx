import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { updatePassword } from "@services/userService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { USER_KEY } from "@hooks/useUser";
import { useFormik } from "formik";
import { passwordUpdateSchema } from "@schemas";

interface PasswordFormProps {}

const PasswordForm: FC<PasswordFormProps> = () => {
  const { t } = useTranslation("layout");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handlePasswordUpdate = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    setUpdatingPassword(true);
    mutate(USER_KEY, async () => {
      try {
        await updatePassword(values);
        toast.success(t("success"));
      } catch {
        toast.error(t("error"));
      }
      setUpdatingPassword(false);
    });
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
    <form
      className="section w-full flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <div className="mt-3 mb-4 font-semibold">{t("update_password")}</div>
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
      <Button loading={updatingPassword} color="secondary" className="ml-auto">
        {t("update")}
      </Button>
    </form>
  );
};

export default PasswordForm;
