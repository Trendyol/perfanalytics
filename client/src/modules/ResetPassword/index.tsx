import { FC } from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";
import RegistrationLayout from "@layouts/RegistrationLayout";

const ResetPassword: FC = () => {
  return (
    <RegistrationLayout>
      <ResetPasswordForm />
    </RegistrationLayout>
  );
};

export default ResetPassword;
