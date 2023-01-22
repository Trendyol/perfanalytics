import cn from "classnames";
import { FC } from "react";

const InfoCard: FC<InfoCardProps> = ({ title, value, percentValue, className }) => {
  return (
    <div className={cn("place-items-center box-border bg-white shadow-md rounded-lg flex flex-col justify-center p-6", className)}>
      <div className="text-lg items-center text-black whitespace-nowrap">{title}</div>
      <div className={cn(`text-displayLg leading-[1] font-bold items-center text-black`, { "animate-pulse": !value })}>{value}</div>
      {percentValue && <div className="mt-2 text-base items-center text-black">{percentValue}</div>}
    </div>
  );
};

const InfoCardPlaceholder: FC = () => {
  return (
    <div className="place-items-center box-border bg-white shadow-md rounded-lg flex flex-col justify-center p-6 gap-2 animate-pulse">
      <div className="h-7 w-full bg-gray-300" />
      <div className="h-12 w-full bg-gray-300" />
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
export { InfoCardPlaceholder };
