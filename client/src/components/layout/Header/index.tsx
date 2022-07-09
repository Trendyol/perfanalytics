import React from "react";
import UserSection from "./components/UserSection";

const Header = () => {
  return (
    <header className="flex justify-center py-4 h-header w-full">
      <div className="w-container flex items-center">
        <UserSection className="ml-auto" />
      </div>
    </header>
  );
};

export default Header;
