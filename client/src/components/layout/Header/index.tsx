import React from "react";
import UserSection from "./components/UserSection";

const Header = () => {
  return (
    <header className="flex justify-end h-28 w-full">
      <div className="flex items-center">
        <UserSection />
      </div>
    </header>
  );
};

export default Header;
