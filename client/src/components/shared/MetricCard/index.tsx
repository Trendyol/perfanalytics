import { getScoreOverHundred } from "@utils/common";
import classNames from "classnames";
import { FC } from "react";
import Icon from "../Icon";

const MetricCard: FC<MetricCardProps> = ({ title, infoLink, score, percentage }) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center px-3 py-2 border-b border-b-gray-200">
        <div className="font-semibold">{title}</div>
        <a href={infoLink} className="tooltip tooltip-left" data-tip="Click for info." >
          <Icon name="info" className="text-gray-500" />
        </a>
      </div>
      <div
        className={classNames("flex text-center", {
          "text-red-500": 0 <= score && score < 0.5,
          "text-yellow-500": 0.5 <= score && score < 0.9,
          "text-green-500": 0.9 <= score && score <= 1,
        })}
      >
        <div className="flex-1 px-3 py-2 border-r border-r-gray-200 text-displayXs font-medium">{getScoreOverHundred(score)}</div>
        <div className="flex-1 px-3 py-2 text-displayXs font-medium text-gray-300">{percentage}%</div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  infoLink: string;
  score: number;
  percentage: number;
}

export default MetricCard;
