import React, { FC, useState } from "react";
import DomainTable from "./components/DomainTable";
import InfoCard from "@components/shared/InfoCard";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="flex flex-col">
        <div className="flex flex-row w-full gap-5">
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
          <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
        </div>
        <DomainTable />
      </div>
    </div>
  );
};

export default Home;
