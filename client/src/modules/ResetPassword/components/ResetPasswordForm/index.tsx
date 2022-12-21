import Button from "@components/shared/Form/Button";
import PasswordField from "@components/shared/Form/TextField/PasswordField";
import { resetPasswordSchema } from "@schemas";
import { changeUserPassword, verifyMailChangeToken } from "@services/userService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordForm: FC = () => {
  const { t } = useTranslation("registration");
  const router = useRouter();
  const [isPasswordChange, setPasswordChange] = useState(false);
  const [isTokenValid, setTokenValid] = useState(true);
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      callVerifyMailChangeToken();
    }
  }, [token]);

  const callVerifyMailChangeToken = async () => {
    try {
      await verifyMailChangeToken(token as string);
    } catch (err) {
      setTokenValid(false);
    }
  };

  const handleClick = async (values: { newPassword: string; confirmPassword: string }) => {
    try {
      if (token) {
        await changeUserPassword(token as string, values.newPassword);
        setPasswordChange(true);
      } else {
        toast.error(t("error") as string);
      }
    } catch (error) {
      toast.error(t("error") as string);
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validationSchema: () => resetPasswordSchema(t),
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  const renderFormContent = () => {
    return (
      <form className="py-16 px-14 rounded-3xl flex flex-col min-w-[600px]" onSubmit={formik.handleSubmit}>
        <div id="header">
          <h1 className="text-displayLg sm:text-displaySm font-semibold mb-8 sm:mb-2 text-center">{t("password_reset")}</h1>
          <p className="text-md mb-8 sm:text-xs text-gray-400 text-center px-8 sm:px-1 whitespace-nowrap">{t("password_short")}</p>
        </div>
        <div id="content" className="flex flex-col gap-3 mb-8">
          <PasswordField
            name="newPassword"
            placeholder={t("new_password")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            error={formik.touched.newPassword && formik.errors.newPassword}
          />
          <PasswordField
            isVerify
            name="confirmPassword"
            placeholder={t("verify_new_password")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </div>
        <div id="actions">
          <Button type="submit" size="large" fluid>
            {t("save")}
          </Button>
        </div>
      </form>
    );
  };

  const redirectLogin = () => {
    router.push("/login");
  };

  const redirectRecover = () => {
    router.push("/recover");
  };

  const renderPasswordSetCompleted = () => {
    return (
      <div
        id="container"
        className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      >
        <p className="text-m text-gray-500 text-center px-5">{t("password_recovery_completed")}</p>
        <Button fluid size="large" onClick={redirectLogin}>
          {t("login")}
        </Button>
      </div>
    );
  };

  const renderTokenInvalid = () => {
    return (
      <div
        id="container"
        className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      >
        <div id="header">
          <h1 className="text-4xl sm:text-3xl mb-4 sm:mb-2 text-center">{t("password_reset_failed")}</h1>
        </div>
        <p className="text-m text-gray-500 text-center px-5">{t("password_reset_token_verify_error")}</p>
        <Button fluid size="large" onClick={redirectRecover}>
          {t("recover_account")}
        </Button>
      </div>
    );
  };

  if (!isTokenValid) return renderTokenInvalid();

  return isPasswordChange ? renderPasswordSetCompleted() : renderFormContent();
};

export default ResetPasswordForm;
