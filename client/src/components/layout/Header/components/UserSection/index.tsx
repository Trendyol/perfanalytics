import { FC, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import useTranslation from "next-translate/useTranslation";
import DropdownItem from "@components/shared/Dropdown/DropdownItem";
import DropdownContent from "@components/shared/Dropdown/DropdownContent";
import useUser from "@hooks/useUser";
import { deleteSession } from "@services/userService";
import SettingsModal from "../SettingsModal";
import { UserDropdownItemType } from "@enums";
import { useRouter } from "next/router";
import Button from "@components/shared/Form/Button";

const UserSection: FC<UserSectionProps> = () => {
  const { t } = useTranslation("layout");
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleShowSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handleLogout = async () => {
    await deleteSession();
    mutateUser(null);
    router.push('/login');
  };

  const handleLogin = async () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-end gap-6 cursor-pointer text-md">
      {user && <IoMdNotificationsOutline fontSize={20} strokeWidth={12} className="text-gray-500 mt-1" />}
      <DropdownContent
        targetElement={
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-500 p-2 w-10 h-10 flex justify-center items-center">
              <AiOutlineUser fontSize={20} className="text-gray-100" />
            </div>
            <p className="capitalize">{user ? user.name : t("guest_name")}</p>
            <IoIosArrowDown fontSize={20} className="text-gray-500 mt-1" />
          </div>
        }
      >
        {user && (
          <DropdownItem onClick={handleShowSettingsModal}>
            <Button color="transparent" size="small" fluid className="h-10 rounded-none">
              {t("settings")}
            </Button>
          </DropdownItem>
        )}
        <DropdownItem onClick={user ? handleLogout : handleLogin}>
          <Button fluid size="small" className="h-10 rounded-none">
            {user ? t("logout") : t("login")}
          </Button>
        </DropdownItem>
      </DropdownContent>
      <SettingsModal show={showSettingsModal} onClose={handleCloseSettingsModal} />
    </div>
  );
};

interface UserSectionProps {}

export default UserSection;
