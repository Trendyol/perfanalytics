import React, { useEffect } from "react";
import { Select } from "antd";

interface Props {
  metrics: any;
  uxDates: any;
  getUxResults: (date: string) => void;
}

const { Option } = Select;

const labelMetricData = (metrics: any) => {
  const nameToAcronymMap = {
    first_contentful_paint: "FCP",
    largest_contentful_paint: "LCP",
    first_input_delay: "FID",
    cumulative_layout_shift: "CLS",
    experimental_uncapped_cumulative_layout_shift: "EUCLS",
  } as any;

  return Object.entries(metrics).map(([metricName, metricData]) => {
    const standardBinLabels = ["Good", "Needs Improvement", "Poor"];
    const metricBins = (metricData as any).histogram;

    const labeledBins = metricBins.map((bin: any, i: any) => ({
      label: standardBinLabels[i],
      percentage: bin.density * 100,
      ...bin,
    }));

    return {
      acronym: nameToAcronymMap[metricName],
      name: metricName,
      labeledBins,
    };
  });
};

const createDescriptionAndBars = (labeledBins: any) => {
  const descEl = document.createElement("p");
  descEl.textContent = labeledBins.map((bin: any) => `${bin.label}: ${bin.percentage.toFixed(2)}%`).join(", ");

  const barsEl = document.createElement("div");

  labeledBins.forEach((bin: any) => {
    const barEl = document.createElement("div");
    barEl.classList.add(`box-${bin.label.replace(" ", "-")}`);
    barEl.title = `bin start: ${bin.start}, bin end: ${bin.end}`;
    barsEl.append(barEl);
  });

  barsEl.style.gridTemplateColumns = labeledBins.map((bin: any) => `${bin.percentage}%`).join(" ");
  barsEl.classList.add("grid-container");

  return [descEl, barsEl];
};

const UxChart: React.FC<Props> = ({ metrics, uxDates, getUxResults }) => {
  useEffect(() => {
    if (metrics) {
      const wrapperElement = document.getElementById("wrapper") as any;

      if (wrapperElement) {
        wrapperElement.innerHTML = "";
      }
      const labeledMetrics = labelMetricData(metrics);

      labeledMetrics.forEach((metric) => {
        const metricEl = document.createElement("section");

        const titleEl = document.createElement("h2");
        titleEl.textContent = metric.acronym;

        const [descEl, barsEl] = createDescriptionAndBars(metric.labeledBins);

        metricEl.append(titleEl, descEl, barsEl);
        wrapperElement?.append(metricEl);
      });
    }
  }, [metrics, uxDates]);

  const onDateChange = (date: any) => {
    getUxResults(date);
  };

  const today = new Date();

  const formattedToday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
  return (
    <div className="ux-chart">
      <div className="title">Chrome Ux</div>
      {uxDates && (
        <Select
          className="select-box"
          defaultValue={formattedToday}
          style={{ width: 120 }}
          onChange={(date) => onDateChange(date)}
        >
          <Option value={formattedToday}>Today</Option>
          {uxDates.map((uxDate: any) => (
            <Option key={uxDate.value} value={`${uxDate.value}.28`}>
              {uxDate.label}
            </Option>
          ))}
        </Select>
      )}
      {metrics ? (
        <div id="wrapper">
          <div />
        </div>
      ) : (
        <div> No results</div>
      )}
    </div>
  );
};

export default UxChart;
