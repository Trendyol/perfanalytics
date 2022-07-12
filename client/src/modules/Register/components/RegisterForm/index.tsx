import { FC } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { registerSchema } from "@schemas";
import { toast } from "react-toastify";
import { useUser } from "@hooks/useUser";
import { createSession, createUser } from "@services/userService";

const RegisterForm: FC = () => {
  const { mutateUser } = useUser();
  const { t } = useTranslation("register");
  const router = useRouter();

  const handleSignUp = async (values: { name: string; email: string; password: string }) => {
    try {
      await createUser(values);
      try {
        await createSession(values);
        await mutateUser();
        router.push("/");
      } catch (error) {
        toast.error(t("registration_error"));
      }
    } catch (error) {
      toast.error(t("registration_error"));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: () => registerSchema(t),
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <form
      id="container"
      className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
      onSubmit={formik.handleSubmit}
    >
      <div id="header">
        <h1 className="text-5xl sm:text-3xl mb-4 sm:mb-2 text-center">{t("sign_up")}</h1>
        <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">{t("see_what_capable_of")}</p>
      </div>
      <div id="content" className="flex flex-col">
        <TextField
          name="name"
          type="text"
          placeholder={t("name")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
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
      </div>
      <div id="actions">
        <Button full type="submit" size="large">
          {t("register")}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
