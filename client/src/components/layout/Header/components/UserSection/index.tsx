import DropdownContent from "@components/shared/Dropdown/DropdownContent";
import DropdownItem from "@components/shared/Dropdown/DropdownItem";
import Button from "@components/shared/Form/Button";
import useUser from "@hooks/useUser";
import { deleteSession } from "@services/userService";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import SettingsModal from "../SettingsModal";

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
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-6 cursor-pointer text-md">
      <IoMdNotificationsOutline fontSize={20} strokeWidth={12} className="text-gray-500 mt-1" />
      <DropdownContent
        targetElement={
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-500 p-2 w-10 h-10 flex justify-center items-center">
              <AiOutlineUser fontSize={20} className="text-gray-100" />
            </div>
            <p className="capitalize">{user.name}</p>
            <IoIosArrowDown fontSize={20} className="text-gray-500 mt-1" />
          </div>
        }
      >
        <DropdownItem onClick={handleShowSettingsModal}>
          <Button color="transparent" size="small" fluid className="h-10 rounded-none">
            {t("settings")}
          </Button>
        </DropdownItem>
        <DropdownItem onClick={handleLogout}>
          <Button fluid size="small" className="h-10 rounded-none">
            {t("logout")}
          </Button>
        </DropdownItem>
      </DropdownContent>
      <SettingsModal show={showSettingsModal} onClose={handleCloseSettingsModal} />
    </div>
  );
};

interface UserSectionProps {}

export default UserSection;
