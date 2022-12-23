import { FilterTimeRange } from "@enums";
import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart: React.FC<LineChartProps> = ({ title, series, loadChartData, setReportResultPeriod }) => {
  const chartId = "123";
  // const [lastClickedLegendIndex, setLastClickedLegendIndex] = useState(0);

  let { current: lastClickedLegendIndex } = React.useRef(0);

  const options = {
    chart: {
      id: chartId,
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
          setReportResultPeriod(FilterTimeRange.ONE_DAY);
          loadChartData(xaxis.min, xaxis.max);
          return { xaxis };
        },
        mounted() {
          const chart = ApexCharts.getChartByID(chartId);

          if (chart) {
            series.map((e: any) => (e.name !== "FCP" ? chart.hideSeries(e.name) : null));
          }
        },
        updated() {
          const chart = ApexCharts.getChartByID(chartId);

          if (chart) {
            series.map((e: any, i: number) => (i !== lastClickedLegendIndex ? chart.hideSeries(e.name) : chart.showSeries(e.name)));
          }
        },
        legendClick(chartContext: any, seriesIndex: number) {
          const chart = ApexCharts.getChartByID(chartId);
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
      tooltip: {
        enabled: false,
      },
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
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6,
      },
    },
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#FFC0CB", "#E91E63", "#FF9800", "#800080"],
  };

  const getLhResultsByDate = (value: FilterTimeRange) => {
    setReportResultPeriod(value);

    // if (typeof value === "number") {
    //   const startDate = new Date();
    //   startDate.setDate(startDate.getDate() - value);
    //   return getLhResults(startDate.getTime());
    // }
    // return getLhResults();
  };

  const filterTimeRangeButtonsTexts = {
    [FilterTimeRange.ONE_DAY]: "1D",
    [FilterTimeRange.ONE_WEEK]: "1W",
    [FilterTimeRange.ONE_MONTH]: "1M",
    [FilterTimeRange.SIX_MONTH]: "6M",
    [FilterTimeRange.ONE_YEAR]: "1Y",
    [FilterTimeRange.ALL]: "ALL",
  };

  return (
    <div className="flex flex-col gap-7 bg-white py-7 px-4 w-full rounded-lg drop-shadow-md text-xl font-semibold  h-[480px]">
      <div className="flex justify-between items-center">
        <h3 className="ml-3 text-displayXs">{title}</h3>
        <div className="flex gap-1 justify-center align-middle justify-items-center">
          <fieldset className="flex gap-2" onChange={(e: any) => getLhResultsByDate(e.target.value)}>
            {Object.entries(filterTimeRangeButtonsTexts).map(([key, value]) => (
              <label>
                <input type="radio" key={key} value={key} name="group2" className="hidden peer" />
                <div className="text-xs py-1 px-3 border rounded-md cursor-pointer hover:bg-gray-100 hover:border-gray-300 peer-checked:bg-gray-300 peer-checked:border-gray-500">
                  {value}
                </div>
              </label>
            ))}
          </fieldset>
        </div>
      </div>

      <Chart options={options as any} series={series} type="area" height={350} />
    </div>
  );
};

interface LineChartProps {
  title: string;
  series: any;
  loadChartData: (startDate: number, endDate?: number, update?: boolean) => void;
  setReportResultPeriod: (value: FilterTimeRange) => void;
}

export default LineChart;
