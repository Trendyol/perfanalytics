import Dropdown from "@components/shared/Dropdown";
import Button from "@components/shared/Form/Button";
import { USER_KEY, useUser } from "@hooks/useUser";
import Image from "next/image";
import { FC } from "react";
import { deleteSession } from "src/services/userService";
import { mutate } from "swr";
import userIcon from "@assets/images/user.svg";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

interface UserSectionProps {}

const UserSection: FC<UserSectionProps> = () => {
  const { t } = useTranslation("layout");
  const { data: user, isLoading } = useUser(true);

  const logout = async () => {
    mutate(USER_KEY, async () => {
      await deleteSession();
      return null;
    });
  };

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <Dropdown.Content
          targetElement={
            <div className="flex items-center">
              <div className="rounded-full bg-[#D9D9D9] p-2 w-8 h-8 mr-3 flex justify-center items-center">
                <Image
                  src={userIcon}
                  alt="Trendyol logo"
                  width={16}
                  height={16}
                />
              </div>
              <p>{user.name}</p>
            </div>
          }
        >
          <Dropdown.Item>{t("settings")}</Dropdown.Item>
          <Dropdown.Item onClick={logout}>{t("logout")}</Dropdown.Item>
        </Dropdown.Content>
      ) : (
        <Button loading={isLoading}>
          <Link href="/login">{t("login")}</Link>
        </Button>
      )}
    </div>
  );
};

export default UserSection;
