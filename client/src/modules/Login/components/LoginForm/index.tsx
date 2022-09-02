import { FC } from "react";
import Button from "@components/shared/Form/Button";
import Checkbox from "@components/shared/Form/Checkbox";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { loginSchema } from "@schemas";
import { createSession } from "@services/userService";
import useUser from "@hooks/useUser";
import { FcGoogle } from "react-icons/fc";

const LoginForm: FC = () => {
  const { mutateUser } = useUser();
  const { t } = useTranslation("login");
  const router = useRouter();

  const handleSession = async (values: { email: string; password: string }) => {
    try {
      await createSession(values);
      mutateUser();
      router.push("/");
    } catch (error) {
      toast.error(t("credential_error"));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validateOnChange: false,
    validationSchema: () => loginSchema(t),
    onSubmit: (values) => {
      handleSession(values);
    },
  });

  return (
    <form
      id="container"
      className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-4 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      onSubmit={formik.handleSubmit}
    >
      <div id="header">
        <h1 className="text-5xl sm:text-3xl mb-4 sm:mb-2 text-center">{t("hello_again")}</h1>
        <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">{t("welcome_to_dashboard")}</p>
        <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">{t("please_login")}</p>
      </div>
      <div id="content" className="flex flex-col gap-4">
        <TextField
          name="email"
          type="email"
          placeholder={t("email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          type="password"
          placeholder={t("password")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <div className="flex justify-between sm:text-sm items-center">
          <span className="flex items-center">
            <Checkbox name="remember" label={t("remember_me")} onChange={formik.handleChange} />
          </span>
          <Link href="/recover">
            <span className="text-primary cursor-pointer text-sm sm:text-xs">{t("recover_password")}</span>
          </Link>
        </div>
      </div>
      <div id="actions">
        <Button fluid type="submit" size="large">
          {t("login")}
        </Button>
      </div>
      <div className="divider mt-0 mb-0 text-slate-300">OR</div>
      <Button size="large" color="light">
        <FcGoogle fontSize={18} />
        <Link href={"http://localhost:4000/session/google/callback"}>
          <span className="pl-2 text-xs">{t("Continue with Google")}</span>
        </Link>
      </Button>
    </form>
  );
};

export default LoginForm;
