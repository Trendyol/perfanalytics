import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { useFormik } from "formik";

const ResetPasswordForm: FC = () => {
  const { t } = useTranslation("reset-password");

  const handleClick = async (values: { newPassword: string; confirmPassword:string; }) => {
    try {
      if(values.newPassword === values.confirmPassword) {}
      else {}
    } catch (error) {
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validateOnChange: false,
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  return (
    <form
      id="container"
      className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      onSubmit={formik.handleSubmit}
    >
      <div id="header">
        <h1 className="text-5xl sm:text-3xl mb-4 sm:mb-2 text-center">{t("password_reset")}</h1>
        <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">{t("password_short")}</p>
      </div>
      <div id="content" className="flex flex-col gap-4">
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
      </div>
      <div id="actions">
        <Button fluid type="submit" size="large">
          {t("save")}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
