import { FC, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import useTranslation from "next-translate/useTranslation";
import DropdownItem from "@components/shared/Dropdown/DropdownItem";
import DropdownContent from "@components/shared/Dropdown/DropdownContent";
import { useUser } from "@hooks/useUser";
import { deleteSession } from "@services/userService";
import SettingsModal from "../SettingsModal";
import { UserDropdownItemType } from "@enums";
import { useRouter } from "next/router";

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
    mutateUser(undefined);
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
        <DropdownItem type={UserDropdownItemType.INFO}>
          <div className="flex flex-col w-full items-center gap-1 p-4">
            <div className="rounded-full bg-gray-500 p-2 w-10 h-10 flex justify-center items-center">
              <AiOutlineUser fontSize={20} className="text-gray-100" />
            </div>
            <div className="text-center">
              <h3 className="capitalize text-lg text-gray-500 font-semibold">{user ? user.name : t("guest_name")}</h3>
              <p className="text-gray-400 text-sm font-medium">{t("guest_info_message")}</p>
            </div>
          </div>
        </DropdownItem>
        {user && (
          <DropdownItem onClick={handleShowSettingsModal}>
            <div className="flex justify-center items-center w-full bg-white hover:bg-gray-50 text-gray-500 border-t text-sm h-10 border-t-gray-200">
              {t("settings")}
            </div>
          </DropdownItem>
        )}
        <DropdownItem onClick={user ? handleLogout : handleLogin}>
          <div className="flex justify-center items-center w-full bg-primary hover:bg-[#F16B00] text-white border-t text-sm h-10">
            {user ? t("logout") : t("login")}
          </div>
        </DropdownItem>
      </DropdownContent>
      <SettingsModal show={showSettingsModal} onClose={handleCloseSettingsModal} />
    </div>
  );
};

interface UserSectionProps {}

export default UserSection;
