import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import { passwordUpdateSchema } from "@schemas";
import { updatePassword } from "@services/userService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface PasswordFormProps {}

const PasswordForm: FC<PasswordFormProps> = () => {
  const { t } = useTranslation("layout");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handlePasswordUpdate = async (values: { oldPassword: string; newPassword: string }) => {
    setUpdatingPassword(true);
    try {
      await updatePassword(values);
      toast.success(t("success") as string);
    } catch {
      toast.error(t("error") as string);
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
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("current_password")}</h5>
        <TextField
          name="oldPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.oldPassword}
          error={formik.touched.oldPassword && formik.errors.oldPassword}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("new_password")}</h5>
        <TextField
          name="newPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          error={formik.touched.newPassword && formik.errors.newPassword}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("confirm_password")}</h5>
        <TextField
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </div>
      <Button loading={updatingPassword} color="primary" className="ml-auto mt-2">
        {t("update")}
      </Button>
    </form>
  );
};

export default PasswordForm;
