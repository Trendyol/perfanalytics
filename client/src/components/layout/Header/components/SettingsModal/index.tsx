import { FC } from "react";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import PasswordForm from "../PasswordForm";
import NameForm from "../NameForm";

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("layout");

  return (
    <Modal show={show} onClose={onClose} title={t("user_settings")}>
      <NameForm />
      <PasswordForm />
    </Modal>
  );
};

export default SettingsModal;
