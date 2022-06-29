import { FC } from "react";
import Button from "@components/shared/Form/Button";
import Checkbox from "@components/shared/Form/Checkbox";
import TextField from "@components/shared/Form/TextField";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

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
        <div
          id="container"
          className="bg-white max-w-xl lg:backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-16 px-24 sm:px-12 sm:py-8 flex flex-col gap-12 sm:gap-10 min-w-[320px] w-[500px] sm:w-[400px]"
        >
          <div id="header">
            <h1 className="text-5xl sm:text-3xl mb-4 sm:mb-2 text-center">
              {t("hello_again")}
            </h1>
            <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">
              {t("welcome_to_dashboard")}
            </p>
            <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">
              {t("please_login")}
            </p>
          </div>
          <div id="content" className="flex flex-col">
            <TextField type="email" placeholder={t("email")} />
            <TextField type="password" placeholder={t("password")} />
            <div className="flex justify-between sm:text-sm">
              <span className="flex items-center">
                <Checkbox />
                <button className="ml-1 text-gray-500 text-sm sm:text-xs">
                  {t("remember_me")}
                </button>
              </span>
              <Link href="/">
                <span className="text-primary cursor-pointer text-sm sm:text-xs">
                  {t("recover_password")}
                </span>
              </Link>
            </div>
          </div>
          <div id="actions">
            <Button size="large">
              {t("login")}
            </Button>
          </div>
        </div>
        <div className="fixed bottom-4 w-full flex justify-center items-center">
          <span className="text-gray-500">{t("dont_have_account")}</span>
          <Link href="/register">
            <span className="ml-1 text-primary cursor-pointer">{t("sign_up")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;