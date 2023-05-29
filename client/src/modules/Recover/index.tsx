import { FC } from "react";
import RecoverForm from "./components/RecoverForm";
import RegistrationLayout from "@layouts/RegistrationLayout";

const Recover: FC = () => {
  return (
    <RegistrationLayout>
      <RecoverForm />
    </RegistrationLayout>
  );
};

export default Recover;
