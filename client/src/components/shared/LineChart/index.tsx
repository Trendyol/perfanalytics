import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart: React.FC<LineChartProps> = ({ id, title, series, setReportTimePeriod }) => {
  let { current: lastClickedLegendIndex } = React.useRef(0);

  const options = {
    chart: {
      id,
      animations: {
        enabled: false,
      },
      stacked: false,
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06,
      },
      height: 350,
      zoom: {
        enabled: true,
      },
      events: {
        beforeZoom(chartContext: any, { xaxis }: any) {
          setReportTimePeriod({
            start: Math.floor(xaxis.min),
            end: Math.ceil(xaxis.max),
          });
          return { xaxis };
        },
        mounted() {
          const chart = ApexCharts.getChartByID(id);

          if (chart) {
            series.map((e: any) => (e.name !== "FCP" ? chart.hideSeries(e.name) : null));
          }
        },
        updated() {
          const chart = ApexCharts.getChartByID(id);

          if (chart) {
            series.map((e: any, i: number) => (i !== lastClickedLegendIndex ? chart.hideSeries(e.name) : chart.showSeries(e.name)));
          }
        },
        legendClick(chartContext: any, seriesIndex: number) {
          const chart = ApexCharts.getChartByID(id);
          lastClickedLegendIndex = seriesIndex;

          if (chart) {
            const { name } = series[seriesIndex];
            series.map((e: any) => (e.name !== name ? chart.hideSeries(e.name) : chart.showSeries(name)));
          }
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      toolbar: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        marker: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetY: -2,
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    tooltip: {
      x: {
        format: "dd.MM.yyyy - HH:mm",
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
    },
    animations: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 6,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 8,
      },
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#FFC0CB", "#E91E63", "#FF9800", "#800080"],
  };

  return (
    <div className="flex flex-col gap-7 bg-white py-7 px-4 w-full rounded-lg drop-shadow-md text-xl font-semibold  h-[480px]">
      <div className="flex justify-between items-center">
        <h3 className="ml-3 text-displayXs">{title}</h3>
      </div>
      <Chart options={options as any} series={series} type="area" height={350} />
    </div>
  );
};

interface LineChartProps {
  id: string;
  title: string;
  series: any;
  setReportTimePeriod: (value: { start: number; end: number }) => void;
}

export default LineChart;
