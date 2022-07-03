import { FC, useState } from "react";
import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import Modal from "@components/shared/Modal";
import useTranslation from "next-translate/useTranslation";
import { updateUsername } from "@services/userService";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { USER_KEY, useUser } from "@hooks/useUser";
import { useFormik } from "formik";
import { nameUpdateSchema } from "@schemas";
import Divider from "@components/shared/Divider";

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ show, onClose }) => {
  const { t } = useTranslation("layout");
  const { data: user } = useUser(true);
  const [updatingName, setUpdatingName] = useState(false);

  const handleNameUpdate = async (values: { name: string }) => {
    setUpdatingName(true);
    mutate(USER_KEY, async () => {
      try {
        await updateUsername(values);
      } catch {
        toast.error(t("error"));
      }
      setUpdatingName(false);
    });
  };

  const formik = useFormik({
    initialValues: { name: user?.name || "" },
    validateOnChange: false,
    validationSchema: () => nameUpdateSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      handleNameUpdate(values);
    },
  });

  return (
    <Modal show={show} onClose={onClose} title={t("settings")}>
      <Divider />
      <form
        className="section w-full flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="mt-3 mb-4 font-semibold">{t("update_name")}</div>
        <TextField
          name="name"
          placeholder={t("name")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
        <Button
          loading={updatingName}
          type="submit"
          color="secondary"
          className="ml-auto"
        >
          {t("update")}
        </Button>
      </form>
      <Divider />
      <div className="section w-full flex flex-col">
        <div className="mt-3 mb-4 font-semibold">{t("update_password")}</div>
        <TextField placeholder="Current Password" />
        <TextField placeholder="Password" />
        <TextField placeholder="Confirm Password" />
        <Button color="secondary" className="ml-auto">
          {t("update")}
        </Button>
      </div>
      <Divider />
    </Modal>
  );
};

export default SettingsModal;
