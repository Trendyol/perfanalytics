import { StatusCode } from "@enums";
import { format, subDays } from "date-fns";

export const hasItem = (array: any[] | undefined | null): boolean => Boolean(array && array.length > 0);

export const deepCopy = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const openUrlInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank");

  newWindow?.focus();
};

export const flattenNestedProperty = (property: any, array?: any[]) => {
  let flattenArray = [] as any;

  if (array && Array.isArray(array)) {
    array.map((m: any) => {
      if (m[property] && m[property].length) {
        flattenArray = [...flattenArray, ...m[property]];
      }
      return m;
    });
  }

  return flattenArray;
};

export const getFavicon = (url: string) => {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`;
};

export const getStartDateByInterval = (endDate: number, periodAsDay: number): number => {
  const startDate = subDays(new Date(endDate), periodAsDay);

  return startDate.valueOf();
};

export const getScoreOverHundred = (value: number, hasPercentage: boolean = true) => {
  if (hasPercentage) {
    return Number(value * 100).toFixed(1);
  }

  return Math.round(Number(value * 100));
};

export const mapReportsData = (data: any) => {
  const mappedData = deepCopy(data);

  return mappedData.map((x: any) => {
    const audits = x.audits;

    for (const auditKey in audits) {
      audits[auditKey] = getScoreOverHundred(audits[auditKey], false);
    }

    x.createdAt = format(new Date(x.createdAt), "MM/dd/yyyy kk:mm");
    x.status = StatusCode[x.status as keyof typeof StatusCode];

    return { ...x, ...audits };
  });
};

export const getFullUrlWithPath = (path: string) => {
  let origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  if (process.env.NODE_ENV === "development") {
    origin = "http://localhost:4000";
  }

  return `${origin}${path}`;
};
