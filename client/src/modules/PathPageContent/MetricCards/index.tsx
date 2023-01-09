import MetricCard from "@components/shared/MetricCard";
import { METRICS } from "@constants";
import { MetricKey } from "@enums";
import React, { memo } from "react";

const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  return (
    <div className="flex gap-6 overflow-scroll pb-3 px-px">
      {Object.keys(METRICS).map((key) => {
        const metricData = METRICS[key as MetricKey];
        return (
          <MetricCard
            key={metricData.label}
            infoLink={metricData.infoLink}
            percentage={0}
            score={metrics ? metrics[key as MetricKey] : 0}
            title={`Avg ${metricData.label}`}
          />
        );
      })}
    </div>
  );
};

interface MetricCardsProps {
  metrics: Record<MetricKey, number> | null;
}

export default memo(MetricCards, (oldProps: MetricCardsProps, newProps: MetricCardsProps) => {
  return newProps.metrics === null;
});
