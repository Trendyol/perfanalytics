import { FC } from "react";

const InfoCard: FC<InfoCardProps> = (props) => {
  const { title, value, percentValue, className } = props;

  return (
    <div className={`stat place-items-center ${className}  box-border mb-5 bg-white shadow-md rounded-lg flex flex-col `}>
        <div className="stat-title text-base items-center text-black">{props.title}</div>
        <div className="stat-value text-3xl font-semibold items-center pt-1 text-black">{props.value}</div>
        <div className="stat-percentValue text-base items-center pt-1 text-black">{props.percentValue}</div>
    </div>
  );
};

interface InfoCardProps {
    title: string,
    value: string,
    percentValue: string
    className?: string
}

export default InfoCard;
