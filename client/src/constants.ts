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

export const DEFAULT_TAG = {
  id: "all",
  name: "All",
  color: "bg-primary",
};

export const METRIC_DATA: Record<string, Metric> = {
  "cumulative-layout-shift": {
    title: "CLS",
    infoLink: "https://web.dev/cls/",
  },
  "first-contentful-paint": {
    title: "FCP",
    infoLink: "https://web.dev/fcp/",
  },
  "first-meaningful-paint": {
    title: "FMP",
    infoLink: "https://web.dev/fmp/",
  },
  interactive: {
    title: "TTI",
    infoLink: "https://web.dev/tti/",
  },
  "largest-contentful-paint": {
    title: "LCP",
    infoLink: "https://web.dev/lcp/",
  },
  "speed-index": {
    title: "SI",
    infoLink: "https://web.dev/si/",
  },
  "total-blocking-time": {
    title: "TBT",
    infoLink: "https://web.dev/tbt/",
  },
};
