import { MetricKey } from "@enums";
import { Metric } from "@interfaces";

export const DEFAULT_SCORE_BADGE_TEXT = "?";
export const LIGHTHOUSE_METRIC_POOR_THRESHOLD = 0;
export const LIGHTHOUSE_METRIC_NEEDSIMPROVEMENT_THRESHOLD = 50;
export const LIGHTHOUSE_METRIC_GOOD_THRESHOLD = 90;
export const USER_KEY = "/user/@me";
export const DEFAULT_LANGUAGE = "en";
export const LAYOUT_EXCLUDED_PAGES = ["/login", "/signup", "/landing", "/recover", "/reset-password"];
export const HEADER_ROUTES = ["dashboard", "sites", "documentation", "blog"];
export const FOOTER_ROUTES = [
  {
    title: "Github",
    url: "https://github.com/trendyol/perfanalytics",
  },
  {
    title: "Changelog",
    url: "#",
  },
  {
    title: "Contact",
    url: "#",
  },
];
export const DEFAULT_TABLE_HEIGHTS = {
  row: 40,
  header: 40,
};
export const DEFAULT_TAG = {
  id: "all",
  name: "All",
  color: "bg-primary",
};

export const METRICS: Record<MetricKey, Metric> = {
  "cumulative-layout-shift": {
    label: "CLS",
    infoLink: "https://web.dev/cls/",
  },
  "first-contentful-paint": {
    label: "FCP",
    infoLink: "https://web.dev/fcp/",
  },
  "first-meaningful-paint": {
    label: "FMP",
    infoLink: "https://web.dev/fmp/",
  },
  interactive: {
    label: "TTI",
    infoLink: "https://web.dev/tti/",
  },
  "largest-contentful-paint": {
    label: "LCP",
    infoLink: "https://web.dev/lcp/",
  },
  "speed-index": {
    label: "SI",
    infoLink: "https://web.dev/si/",
  },
  "total-blocking-time": {
    label: "TBT",
    infoLink: "https://web.dev/tbt/",
  },
};

export const chartLegends = [
  {
    dataKey: "first-contentful-paint",
    label: "FCP",
  },
  {
    dataKey: "speed-index",
    label: "SI",
  },
  {
    dataKey: "largest-contentful-paint",
    label: "LCP",
  },
  {
    dataKey: "interactive",
    label: "TTI",
  },
  {
    dataKey: "total-blocking-time",
    label: "TBT",
  },
  {
    dataKey: "cumulative-layout-shift",
    label: "CLS",
  },
  {
    dataKey: "first-meaningful-paint",
    label: "FMP",
  },
];
