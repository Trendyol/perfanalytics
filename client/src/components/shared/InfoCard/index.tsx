import { FC } from "react";
import classNames from "classnames";

const InfoCard: FC<InfoCardProps> = (props) => {
  const { title, value, percentValue, className } = props;

  return (
    <div className={classNames("stat place-items-center box-border mb-5 bg-white shadow-md rounded-lg flex flex-col", className)}>
      <div className="stat-title text-base items-center text-black">{title}</div>
      <div className="stat-value text-3xl font-semibold items-center pt-1 text-black">{value}</div>
      <div className="stat-percentValue text-base items-center pt-1 text-black">{percentValue}</div>
    </div>
  );
};

interface InfoCardProps {
  title: string;
  value: string;
  percentValue: string;
  className?: string;
}

export default InfoCard;
