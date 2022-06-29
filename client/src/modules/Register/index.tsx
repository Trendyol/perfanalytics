import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import { USER_KEY, useUser } from "@hooks/useUser";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { createSession, createUser } from "src/services/userService";
import { mutate } from "swr";

const Register: FC = () => {
  const { t } = useTranslation("register");
  const { data: user } = useUser(true);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  const handleSignUp = async () => {
    try {
      await createUser({ name, email, password });
      try {
        await createSession({ email, password });
        mutate(USER_KEY);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              {t("sign_up")}
            </h1>
            <p className="text-sm sm:text-xs text-gray-500 text-center px-8 sm:px-1">
              {t("see_what_capable_of")}
            </p>
          </div>
          <div id="content" className="flex flex-col">
            <TextField type="text" placeholder={t("name")} onChange={e => setName(e.target.value)} />
            <TextField type="email" placeholder={t("email")} onChange={e => setEmail(e.target.value)} />
            <TextField type="password" placeholder={t("password")} onChange={e => setPassword(e.target.value)} />
          </div>
          <div id="actions">
            <Button size="large" onClick={() => handleSignUp()}>{t("register")}</Button>
          </div>
        </div>
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

export default Register;
