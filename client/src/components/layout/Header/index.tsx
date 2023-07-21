import React from "react";
import UserSection from "./components/UserSection";
import { useConfig } from "@contexts/ConfigContext";
import axios from "axios";

const Header = () => {
  const config = useConfig();
  console.log('baseUrl', config.baseUrl, axios.defaults.baseURL);

  return (
    <header className="flex justify-end h-28 w-full">
      <UserSection />
    </header>
  );
};

export default Header;
