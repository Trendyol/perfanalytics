import { FC } from "react";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import Divider from "@components/shared/Divider";
import PasswordForm from "../PasswordForm";
import NameForm from "../NameForm";

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("layout");

  return (
    <Modal show={show} onClose={onClose} title={t("settings")}>
      <Divider />
      <NameForm />
      <Divider />
      <PasswordForm />
      <Divider />
    </Modal>
  );
};

export default SettingsModal;
