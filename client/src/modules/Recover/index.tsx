import { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import RecoverForm from "./components/RecoverForm";

const Recover: FC = () => {
  const { t } = useTranslation("recover");

  return (
    <main className="flex flex-row h-screen overflow-hidden bg-center bg-cover">
      <div className="flex w-1/2 bg-primary lg:hidden overflow-hidden h-full items-center justify-center">
        <span className="text-white text-5xl font-extrabold">
          {t("trendyol")}
        </span>
      </div>
      <div className="flex w-1/2 lg:w-full h-screen overflow-hidden items-center justify-center p-6">
        <RecoverForm />
        <div className="fixed bottom-4 w-full flex justify-center items-center">
          <span className="text-gray-500">{t("already_have_account")}</span>
          <Link href="/login">
            <span className="ml-1 text-primary cursor-pointer">
              {t("sign_in")}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Recover;
