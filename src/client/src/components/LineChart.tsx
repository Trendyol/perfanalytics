import React, { useRef } from "react";
import Chart from "react-apexcharts";

interface Props {
  data: number[];
  height?: number;
  loadChartData: (startDate: number, endDate?: number, update?: boolean) => void;
  setSelectedDate: (state: number) => void;
}

const parseData = (data: any, index: any) => {
  const result = [] as any;
  data.forEach((row: any) => {
    result.push([row[0], row[index]]);
  });

  return result;
};

const LineChart: React.FC<Props> = (props) => {
  const chartRef = useRef() as any;
  const { data, height = 350, loadChartData, setSelectedDate } = props;
  const series = [
    {
      name: "Overall Performance",
      data: parseData(data, 1),
    },
    {
      name: "First Contentful Paint",
      data: parseData(data, 2),
    },
    {
      name: "First Meaningful Paint",
      data: parseData(data, 3),
    },
    {
      name: "Largest Contentful Paint",
      data: parseData(data, 4),
    },
    {
      name: "Total Blocking Time",
      data: parseData(data, 5),
    },
    {
      name: "Speed Index",
      data: parseData(data, 6),
    },
    {
      name: "Time to Interactive",
      data: parseData(data, 7),
    },
    {
      name: "Cumulative Layout Shift",
      data: parseData(data, 8),
    },
  ];
  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      height: 350,
      zoom: {
        enabled: true,
      },
      events: {
        beforeZoom(chartContext: any, { xaxis }: any) {
          setSelectedDate(0);
          loadChartData(xaxis.min, xaxis.max);
          return { xaxis };
        },
        // We might need this events to handle table interactions.
        mounted() {
          series.map((e) => (e.name !== "Overall Performance" ? chartRef.current.chart.hideSeries(e.name) : null));
        },
        legendClick(chartContext: unknown, seriesIndex: number) {
          const { name } = series[seriesIndex];
          chartRef.current.chart.resetSeries(true, false);
          chartRef.current.chart.showSeries(name);
          series.map((e) => (e.name !== name ? chartRef.current.chart.hideSeries(e.name) : null));
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    animations: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "straight",
    },
    markers: {
      size: 0,
      colors: ["#f37a19"],
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
  };

  return (
    <div id="chart">
      <Chart ref={chartRef} options={options as any} series={series} type="area" height={height as any} />
    </div>
  );
};

export default LineChart;
