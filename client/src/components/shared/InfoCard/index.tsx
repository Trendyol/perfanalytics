import { FC } from "react";
import cn from "classnames";

const InfoCard: FC<InfoCardProps> = ({ title, value, percentValue, className }) => {
  return (
    <div className={cn("stat place-items-center box-border bg-white shadow-md rounded-lg flex flex-col justify-center h-[135px]", className)}>
      <div className="text-lg items-center text-black">{title}</div>
      <div className={cn(`stat-value text-displayLg font-bold items-center text-black`, { "animate-pulse": !value })}>{value}</div>
      {percentValue && <div className="stat-percentValue text-base items-center text-black">{percentValue}</div>}
    </div>
  );
};

interface InfoCardProps {
  title?: string;
  value?: string;
  percentValue?: string;
  className?: string;
}

export default InfoCard;
