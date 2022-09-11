import clsx from "clsx";
import React, { FC } from "react";
import styles from "./style.module.scss";

interface RegistrationLayoutProps {
  children: React.ReactNode;
}

const RegistrationLayout: FC<RegistrationLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="flex flex-row h-screen bg-center bg-cover">
      <div className={clsx(styles.logo, "flex w-[680px] bg-primary lg:hidden h-full items-center justify-center")} />
      <div className="flex-1 flex justify-center items-center">{children}</div>
    </main>
  );
};

export default RegistrationLayout;
