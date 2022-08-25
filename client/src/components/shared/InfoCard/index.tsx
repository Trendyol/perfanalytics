import { FC } from "react";
import classNames from "classnames";
import clsx from "clsx";
const InfoCard: FC<InfoCardProps> = ({ title, value, percentValue, className }) => {

  return (
    <div className={classNames("stat place-items-center box-border mb-5 bg-white shadow-md rounded-lg flex flex-col justify-center h-[124px]", className)}>
      <div className="stat-title text-base items-center text-black animate-pulse">{title ? title : <div className=" w-full h-2 bg-slate-700 h-10"></div>}</div>
      <div className={clsx(`stat-value text-3xl font-semibold items-center pt-1 text-black`, { "animate-pulse": !value })}>{value}</div>
      {percentValue && <div className="stat-percentValue text-base items-center pt-1 text-black">{percentValue}</div>}
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
