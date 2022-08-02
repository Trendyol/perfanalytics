import { FC } from "react";
import InfoCard from "@components/shared/InfoCard";

const InfoCardContainer: FC = () => {
  return (
    <div className="flex flex-row w-full gap-5">
      <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
      <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
      <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
      <InfoCard title="Kayra" value="BERK" percentValue="%61 Tuncer" className="w-1/4" />
    </div>
  );
};

export default InfoCardContainer;
