import MetricCard from "@components/shared/MetricCard";
import { METRIC_DATA } from "@constants";
import React, { memo } from "react";

const LighthouseMetricCards: React.FC<LighthouseMetricCardsProps> = ({ metrics }) => {
  return (
    <div className="flex gap-6">
      {Object.entries(METRIC_DATA).map(([key, metricValue]) => {
        return METRIC_DATA[key] ? (
          <MetricCard
            key={metricValue.title}
            infoLink={metricValue.infoLink}
            percentage={0}
            score={metrics ? metrics[key] : 0}
            title={`Avg ${metricValue.title}`}
          />
        ) : null;
      })}
    </div>
  );
};

interface LighthouseMetricCardsProps {
  metrics: any;
}

export default memo(LighthouseMetricCards, (oldProps: LighthouseMetricCardsProps, newProps: LighthouseMetricCardsProps) => {
  return newProps.metrics === null;
});
