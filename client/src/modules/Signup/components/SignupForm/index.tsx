import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import PasswordField from "@components/shared/Form/TextField/PasswordField";
import useUser from "@hooks/useUser";
import { signupSchema } from "@schemas";
import { createSession, createUser } from "@services/userService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignupForm: FC = () => {
  const { mutateUser } = useUser();
  const { t } = useTranslation("registration");
  const router = useRouter();

  const handleSignUp = async (values: { name: string; email: string; password: string }) => {
    try {
      await createUser(values);
      try {
        await mutateUser();
        router.push("/login");
      } catch (error) {
        toast.error(t("registration_error") as string);
      }
    } catch (error) {
      toast.error(t("registration_error") as string);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validateOnChange: false,
    validationSchema: () => signupSchema(t),
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <form className="py-16 px-14 rounded-3xl flex flex-col min-w-[600px]" onSubmit={formik.handleSubmit}>
      <div>
        <h1 className="text-displayLg sm:text-displaySm font-semibold mb-8 sm:mb-2 text-center">{t("signup")}</h1>
        <p className="text-md mb-8 sm:text-xs text-gray-400 text-center px-8 sm:px-1 whitespace-nowrap">
          <span className="block">{t("see_what_capable_of")}</span>
          {t("login_redirection_part_1")}
          <Link href="/login">
            <a className="font-semibold text-primary hover:text-orange-600">{t("login")}</a>
          </Link>
          {t("login_redirection_part_2")}
        </p>
      </div>
      <div className="flex flex-col gap-3 mb-8">
        <TextField
          name="name"
          type="text"
          placeholder={t("name")}
          rightIcon="alphabet"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
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
        <PasswordField
          isVerify
          name="verifyPassword"
          placeholder={t("verify_password")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.verifyPassword}
          error={formik.touched.verifyPassword && formik.errors.verifyPassword}
        />
      </div>
      <div className="flex flex-col gap-6">
        <Button type="submit" size="large" fluid>
          {t("signup")}
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

export default SignupForm;
