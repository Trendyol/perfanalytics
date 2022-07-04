import React from "react";
import UserSection from "./UserSection";

const Header = () => {
  return (
    <header className="flex justify-end px-12 py-4 h-[70px]">
      <UserSection />
    </header>
  );
};

export default Header;
