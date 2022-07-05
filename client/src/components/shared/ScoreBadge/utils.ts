import {
  LIGHTHOUSE_METRIC_GOOD_THRESHOLD,
  LIGHTHOUSE_METRIC_NEEDSIMPROVEMENT_THRESHOLD,
  LIGHTHOUSE_METRIC_POOR_THRESHOLD,
} from "@constants";
import { SCORE_BADGE_TYPE } from "./enums";

const getBadgeColorClass = (type: SCORE_BADGE_TYPE): string => {
  const scoreBadgeColorClass = {
    [SCORE_BADGE_TYPE.UNKNOWN]: "bg-gray-700",
    [SCORE_BADGE_TYPE.POOR]: "bg-red-500",
    [SCORE_BADGE_TYPE.NEEDSIMPROVEMENT]: "bg-yellow-500",
    [SCORE_BADGE_TYPE.GOOD]: "bg-green-500",
  };

  return scoreBadgeColorClass[type];
};

// For ranges: https://web.dev/performance-scoring/?utm_source=lighthouse&utm_medium=devtools#color-coding
const getBadgeType = (score: number): SCORE_BADGE_TYPE => {
  let badgeType;

  if (score >= LIGHTHOUSE_METRIC_GOOD_THRESHOLD) {
    badgeType = SCORE_BADGE_TYPE.GOOD;
  } else if (score >= LIGHTHOUSE_METRIC_NEEDSIMPROVEMENT_THRESHOLD) {
    badgeType = SCORE_BADGE_TYPE.NEEDSIMPROVEMENT;
  } else if (score >= LIGHTHOUSE_METRIC_POOR_THRESHOLD) {
    badgeType = SCORE_BADGE_TYPE.POOR;
  } else {
    badgeType = SCORE_BADGE_TYPE.UNKNOWN;
  }

  return badgeType;
};

export { getBadgeColorClass, getBadgeType };
