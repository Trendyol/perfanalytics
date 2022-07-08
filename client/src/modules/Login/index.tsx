import { FC } from "react";
import Button from "@components/shared/Form/Button";
import Checkbox from "@components/shared/Form/Checkbox";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

const Login: FC = () => {
  const { t } = useTranslation("login");

  return (
    <main className="flex flex-row h-screen overflow-hidden bg-center bg-cover">
      <div className="flex w-1/2 bg-primary lg:hidden overflow-hidden h-full items-center justify-center">
        <span className="text-white text-5xl font-extrabold">
          {t("trendyol")}
        </span>
      </div>
      <div className="flex w-1/2 lg:w-full h-screen overflow-hidden items-center justify-center p-6">
        <LoginForm />
        <div className="fixed bottom-4 w-full flex justify-center items-center">
          <span className="text-gray-500">{t("dont_have_account")}</span>
          <Link href="/register">
            <span className="ml-1 text-primary cursor-pointer">
              {t("sign_up")}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
