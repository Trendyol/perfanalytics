import { openUrlInNewTab } from "@utils/common";
import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart: React.FC<LineChartProps> = ({ id, annotations, series, setReportTimePeriod }) => {
  let lastClickedLegendIndex = React.useRef(0);

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
      height: 340,
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
            series.map((e: any) => (e.name !== "PERF" ? chart.hideSeries(e.name) : null));
          }
        },
        updated() {
          const chart = ApexCharts.getChartByID(id);

          if (chart) {
            series.map((serie: any, i: number) => {
              return i !== lastClickedLegendIndex.current ? chart.hideSeries(serie.name) : chart.showSeries(serie.name);
            });
          }
        },
        legendClick(chartContext: any, seriesIndex: number) {
          const chart = ApexCharts.getChartByID(id);
          lastClickedLegendIndex.current = seriesIndex;

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
    annotations: {
      position: "front",
      xaxis: [
        ...(annotations?.map((annotation) => ({
          x: new Date(annotation.date).getTime(),
          borderColor: "#666",
          strokeDashArray: 0,
          label: {
            borderWidth: 1,
            position: "top",
            offsetY: -27,
            offsetX: 1,
            style: {
              color: "#fff",
              background: "#666",
              cssClass: "cursor-pointer",
            },
            text: annotation.name ?? "Deployment",
            mouseEnter: (data: any, event: any) => {
              event.target.style.cursor = "pointer";
            },
            click: () => {
              openUrlInNewTab(annotation.url);
            },
          },
        })) || []),
      ],
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
        format: "dd.MM.yyyy<br />HH:mm",
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
    },
    animations: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      strokeColor: "#fff",
      strokeWidth: 2,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 5,
      },
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#FFC0CB", "#E91E63", "#FF9800", "#800080"],
  };

  return <Chart options={options as any} series={series} type="area" height={350} width="100%" />;
};

interface LineChartProps {
  id: string;
  series: any;
  annotations?: Array<{
    name: string;
    date: string;
    url: string;
  }>;
  setReportTimePeriod: (value: { start: number; end: number }) => void;
}

export default LineChart;
