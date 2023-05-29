import { FC } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationLayout from "@layouts/RegistrationLayout";

const Login: FC = () => {
  return (
    <RegistrationLayout>
      <LoginForm />
    </RegistrationLayout>
  );
};

export default Login;
