import { DEFAULT_SCORE_BADGE_TEXT } from "@constants";
import { FC } from "react";
import { SCORE_BADGE_TYPE } from "./enums";
import { getBadgeColorClass } from "./utils";

const ScoreBadge: FC<ScoreBadgeProps> = (props) => {
  const { type, score } = props;
  const badgeColorClass = getBadgeColorClass(type);

  return (
    <div
      className={`flex items-center justify-center w-12 h-6 rounded-[4px] mx-auto text-white ${badgeColorClass}`}
    >
      {score ?? DEFAULT_SCORE_BADGE_TEXT}
    </div>
  );
};

interface ScoreBadgeProps {
  type: SCORE_BADGE_TYPE;
  score: number;
}

export default ScoreBadge;
