import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { recoverPassword } from "@services/userService";
import { toast } from "react-toastify";
import { recoverSchema } from "@schemas";
import { DEFAULT_LANGUAGE } from "@constants";
import Link from "next/link";

const RecoverForm: FC = () => {
  const { t } = useTranslation("registration");
  const [isMailSend, setMailSend] = useState(false);
  const router = useRouter();

  const handleClick = async (values: { email: string; emailVerify: string }) => {
    const lang = router.locale || DEFAULT_LANGUAGE;
    try {
      await recoverPassword(values.email, lang);
      setMailSend(true);
    } catch (error) {
      toast.error(t("error"));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      emailVerify: "",
    },
    validateOnChange: false,
    validationSchema: () => recoverSchema(t),
    onSubmit: (values) => {
      handleClick(values);
    },
  });

  const renderFormContent = () => {
    return (
      <form className="py-16 px-14 rounded-3xl flex flex-col min-w-[600px]" onSubmit={formik.handleSubmit}>
        <div id="header">
          <h1 className="text-displayLg sm:text-displaySm font-semibold mb-8 sm:mb-2 text-center">{t("recover_account")}</h1>
          <p className="text-md sm:text-xs text-gray-400 text-center px-8 sm:px-1 whitespace-nowrap">{t("enter_email_to_recover")}</p>
          <p className="text-md mb-8 sm:text-xs text-gray-400 text-center px-8 sm:px-1 whitespace-nowrap">
            {t("login_redirection_part_1")}
            <Link href="/login">
              <a className="font-semibold text-primary hover:text-orange-600">{t("login")}</a>
            </Link>
            {t("login_redirection_part_2")}
          </p>
        </div>
        <div id="content" className="flex flex-col gap-3 mb-8">
          <TextField
            name="email"
            type="email"
            placeholder={t("email")}
            rightIcon="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="emailVerify"
            type="email"
            placeholder={t("verify_email")}
            rightIcon="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailVerify}
            error={formik.touched.emailVerify && formik.errors.emailVerify}
          />
        </div>
        <div id="actions">
          <Button fluid type="submit" size="large">
            {t("recover_my_password")}
          </Button>
        </div>
      </form>
    );
  };

  const redirectLogin = () => {
    router.push("/login");
  };

  const renderMailSent = () => {
    return (
      <div
        id="container"
        className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      >
        <p className="text-m text-primary text-center px-5">{t("recover_email_sent")}</p>
        <ul className="list-disc list-inside marker:text-primary">
          <p className="text-sm sm:text-xs text-gray-600 sm:px-1">{t("mail_not_sent")}</p>
          <li className="text-sm sm:text-xs text-gray-600 sm:px-1  p-0.5 mt-3">{t("mail_not_sent_reason_1")}</li>
          <li className="text-sm sm:text-xs text-gray-600 sm:px-1 p-0.5">{t("mail_not_sent_reason_2")}</li>
          <li className="text-sm sm:text-xs text-gray-600 sm:px-1 p-0.5">{t("mail_not_sent_reason_3")}</li>
        </ul>
        <Button fluid size="large" onClick={redirectLogin}>
          {t("login")}
        </Button>
      </div>
    );
  };

  return isMailSend ? renderMailSent() : renderFormContent();
};

export default RecoverForm;
