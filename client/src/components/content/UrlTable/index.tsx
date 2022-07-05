import React, { FC } from "react";
import CustomTable from "@components/shared/CustomTable";
import ScoreBadge from "@components/shared/ScoreBadge";
import { getBadgeType } from "@components/shared/ScoreBadge/utils";

const columnData = [
  {
    dataKey: "url",
    label: "URL",
  },
  {
    dataKey: "avgFCP",
    label: "Avg FCP",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgSI",
    label: "Avg SI",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgLCP",
    label: "Avg LCP",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgTTI",
    label: "Avg TTI",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgTBT",
    label: "Avg TBT",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgCLS",
    label: "Avg CLS",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgFMP",
    label: "Avg FMP",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "avgPERF",
    label: "Avg PERF",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "overallScore",
    label: "Overall Score",
    columnWidth: 100,
    cellRenderer: (cellData: number) => (
      <ScoreBadge type={getBadgeType(cellData)} score={cellData} />
    ),
  },
  {
    dataKey: "lastReportDate",
    label: "Last Report Date",
    columnWidth: 200,
  },
];

const data = [
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
  {
    url: "www.trendyol.com",
    avgFCP: 25,
    avgSI: 0,
    avgTTI: 50,
    avgTBT: 80,
    avgCLS: 95,
    avgFMP: 100,
    avgPERF: 5,
    overallScore: 5,
    lastReportDate: "06/26/22 9:06:02",
  },
];

const UrlTable: FC<UrlTableProps> = () => {
  return <CustomTable columnData={columnData} data={data} />;
};

interface UrlTableProps {}

export default UrlTable;
