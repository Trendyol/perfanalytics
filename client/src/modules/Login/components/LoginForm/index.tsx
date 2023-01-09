import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import PasswordField from "@components/shared/Form/TextField/PasswordField";
import useUser from "@hooks/useUser";
import { loginSchema } from "@schemas";
import { createSession } from "@services/userService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginForm: FC = () => {
  const { mutateUser } = useUser();
  const { t } = useTranslation("registration");
  const router = useRouter();

  const handleSession = async (values: { email: string; password: string }) => {
    try {
      await createSession(values);
      mutateUser();
      router.push("/");
    } catch (error) {
      toast.error(t("credential_error") as string);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: () => loginSchema(t),
    onSubmit: (values) => {
      handleSession(values);
    },
  });

  return (
    <form className="py-16 px-14 rounded-3xl flex flex-col min-w-[600px]" onSubmit={formik.handleSubmit}>
      <div>
        <h1 className="text-displayLg sm:text-displaySm font-semibold mb-8 sm:mb-2 text-center">{t("login")}</h1>
        <p className="text-md mb-8 sm:text-xs text-gray-400 text-center px-8 sm:px-1 whitespace-nowrap">
          {t("signup_redirection_part_1")}
          <Link href="/signup">
            <span className="font-semibold text-primary hover:text-orange-600">{t("signup")}</span>
          </Link>
          {t("signup_redirection_part_2")}
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-5">
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
        <PasswordField
          name="password"
          placeholder={t("password")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="mb-8 flex ml-auto justify-between sm:text-sm items-center">
        <Link href="/recover">
          <span className="text-gray-400 hover:text-gray-600 cursor-pointer text-sm sm:text-xs select-none">{t("forgot_password")}</span>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <Button type="submit" size="large" fluid>
          {t("login")}
        </Button>
        <div className="divider mt-0 mb-0 text-slate-300 select-none">OR</div>
        <Button size="large" color="light" className="flex gap-2" fluid>
          <FcGoogle fontSize={22} />
          <Link href={"http://localhost:4000/session/google/callback"}>
            <span>{t("Continue with Google")}</span>
          </Link>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
