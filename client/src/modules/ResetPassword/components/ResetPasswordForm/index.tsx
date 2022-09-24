import { FC, useEffect, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { changeUserPassword, verifyMailChangeToken } from "@services/userService";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "@schemas";

const ResetPasswordForm: FC = () => {
  const { t } = useTranslation("reset-password");
  const router = useRouter();
  const [isPasswordChange, setPasswordChange] = useState(false);
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      callVerifyMailChangeToken();
    }
  }, [token])

  const callVerifyMailChangeToken = async () => {
    try {
      await verifyMailChangeToken(token as string);
    } catch (err) {
      toast.error(t("password_reset_token_verify_error"));
    }
  };

  const handleClick = async (values: { newPassword: string; confirmPassword: string; }) => {
    try {
      if (token) {
        await changeUserPassword(token as string, values.newPassword);
        setPasswordChange(true);
      }
      else {
        toast.error(t("error"));
      }
    } catch (error) {
      toast.error(t("error"));
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validateOnChange: false,
    validationSchema: () => resetPasswordSchema(t),
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  const renderFormContent = () => {
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
  }

  const redirectLogin = () => {
    router.push("/login");
  }

  const renderPasswordSetCompleted = () => {
    return (
      <div id="container"
        className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]">
        <p className="text-m text-gray-500 text-center px-5">{t("password_recovery_completed")}</p>
        <Button fluid size="large" onClick={redirectLogin}>
          {t("login")}
        </Button>
      </div>
    )
  }

  return isPasswordChange ? renderPasswordSetCompleted() : renderFormContent();
};

export default ResetPasswordForm;
