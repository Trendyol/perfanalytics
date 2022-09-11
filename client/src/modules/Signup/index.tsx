import { FC } from "react";
import SignupForm from "./components/SignupForm";
import RegistrationLayout from "@layouts/RegistrationLayout";

const Signup: FC = () => {
  return (
    <RegistrationLayout>
      <SignupForm />
    </RegistrationLayout>
  );
};

export default Signup;
