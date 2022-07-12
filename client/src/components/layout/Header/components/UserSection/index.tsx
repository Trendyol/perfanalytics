import { FC, useState } from "react";
import Dropdown from "@components/shared/Dropdown";
import Button from "@components/shared/Form/Button";
import { useUser } from "@hooks/useUser";
import Image from "next/image";
import userIcon from "@assets/images/user.svg";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { deleteSession } from "@services/userService";
import SettingsModal from "../SettingsModal";
import classNames from "classnames";

interface UserSectionProps {
  className?: string;
}

const UserSection: FC<UserSectionProps> = ({ className }) => {
  const { t } = useTranslation("layout");
  const { user, isLoading, mutateUser } = useUser();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleShowSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const logout = async () => {
    await deleteSession();
    mutateUser(undefined);
  };

  return (
    <div className={classNames("flex items-center gap-3", className)}>
      {user ? (
        <Dropdown.Content
          targetElement={
            <div className="flex items-center">
              <div className="rounded-full bg-[#D9D9D9] p-2 w-8 h-8 mr-3 flex justify-center items-center">
                <Image src={userIcon} alt="Trendyol logo" width={16} height={16} />
              </div>
              <p>{user.name}</p>
            </div>
          }
        >
          <Dropdown.Item onClick={handleShowSettingsModal}>{t("settings")}</Dropdown.Item>
          <Dropdown.Item onClick={logout}>{t("logout")}</Dropdown.Item>
        </Dropdown.Content>
      ) : (
        <Button loading={isLoading}>
          <Link href="/login">{t("login")}</Link>
        </Button>
      )}

      <SettingsModal show={showSettingsModal} onClose={handleCloseSettingsModal} />
    </div>
  );
};

export default UserSection;
