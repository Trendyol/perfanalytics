import React from "react";
import useTranslation from "next-translate/useTranslation";
import { createSession } from "src/services/userService";
import Button from "@components/shared/Form/Button";
import { USER_KEY, useUser } from "@hooks/useUser";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { mutate } = useUser(true);
  const { t } = useTranslation("home");
  return (
    <div className="flex justify-center items-center text-4xl font-bold min-h-full">
      {t("home")}

      <Button
        onClick={async () => {
          await createSession();
          mutate(USER_KEY);
        }}
      >
        Mock Login
      </Button>
    </div>
  );
};

export default Home;
