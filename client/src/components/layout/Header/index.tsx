import React from "react";
import UserSection from "./components/UserSection";

const Header = () => {
  return (
    <header className="flex justify-end h-28 w-full">
      <UserSection />
    </header>
  );
};

export default Header;
