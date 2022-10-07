import Button from "@components/shared/Form/Button";
import TextField from "@components/shared/Form/TextField";
import useUser from "@hooks/useUser";
import { nameUpdateSchema } from "@schemas";
import { updateUsername } from "@services/userService";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface NameFormProps {}

const NameForm: FC<NameFormProps> = () => {
  const { t } = useTranslation("layout");
  const { user, mutateUser } = useUser();
  const [updatingName, setUpdatingName] = useState(false);

  const handleNameUpdate = async (values: { name: string }) => {
    setUpdatingName(true);
    try {
      await updateUsername(values);
      mutateUser();
      toast.success(t("success"));
    } catch {
      toast.error(t("error"));
    }
    setUpdatingName(false);
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
    <form className="section w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h5 className="text-[14px] font-medium text-gray-500">{t("name")}</h5>
        <TextField
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
      </div>
      <Button loading={updatingName} type="submit" color="primary" className="ml-auto mt-2">
        {t("update")}
      </Button>
    </form>
  );
};

export default NameForm;
