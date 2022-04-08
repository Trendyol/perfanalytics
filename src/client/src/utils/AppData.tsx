export const tableColumns = [
    {
      id: "id",
      short: "Detail",
      description: "",
    },
    {
      id: "date",
      short: "Date",
      description: "",
    },
    {
      id: "fcp",
      short: "FCP",
      description:
        "First Contentful Paint marks the time at which the first text or image is painted.",
    },
    {
      id: "si",
      short: "SI",
      description:
        "Speed Index shows how quickly the contents of a page are visibly populated.",
    },
    {
      id: "lcp",
      short: "LCP",
      description:
        "Largest Contentful Paint marks the time at which the largest text or image is painted.",
    },
    {
      id: "tti",
      short: "TTI",
      description:
        "Time to interactive is the amount of time it takes for the page to become fully interactive.",
    },
    {
      id: "tbt",
      short: "TBT",
      description:
        "Total Blocking Time is sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.",
    },
    {
      id: "cls",
      short: "CLS",
      description:
        "Cumulative Layout Shift measures the movement of visible elements within the viewport.",
    },
    {
      id: "fmp",
      short: "FMP",
      description:
        "First Meaningful Paint",
    },
    {
      id: "prf",
      short: "PERF",
      description: "Overall performance score.",
    },
    {
      id: "status",
      short: "STATUS",
      description: "Status",
    },
  ];

export const metrics = [
    {
      name: "Performance",
      short: "slack_prf",
    },
    {
      name: "First Contentful Paint",
      short: "slack_fcp",
    },
    {
      name: "Speed Index",
      short: "slack_si",
    },
    {
      name: "Largest Contentful Paint",
      short: "slack_lcp",
    },
    {
      name: "First Meaningful Paint",
      short: "slack_fmp",
    },
    {
      name: "Time to Interactive ",
      short: "slack_tti",
    },
    {
      name: "Total Blocking Time",
      short: "slack_tbt",
    },
    {
      name: "Cumulative Layout Shift ",
      short: "slack_cls",
    },
  ];

  export const timeOptions = [
    {
    label: "Daily",
    value: "slack_daily"
    },
    {
      label: "Weekly",
      value: "slack_weekly"
    },
    {
      label: "Monthly",
      value: "slack_monthly"
    }
]