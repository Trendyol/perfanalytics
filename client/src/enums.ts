export enum UserDropdownItemType {
  INFO,
  ACTION,
}

export enum UserDropdownButtonType {
  PRIMARY,
  NORMAL,
}

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum TagAction {
  ADD,
  UPDATE,
  DELETE,
}

export const StatusCode: Record<0 | 1 | 2, string> = {
  0: "Pending",
  1: "Success",
  2: "Failed",
};


export enum DeviceTypes {
  Desktop = "desktop",
  Mobile = "mobile",
}

export enum ReportTimePeriod {
  ONE_DAY = 1,
  ONE_WEEK = 7,
  ONE_MONTH = 30,
  SIX_MONTH = 180,
  ONE_YEAR = 365,
}

export type MetricKey =
  | "cumulative-layout-shift"
  | "first-contentful-paint"
  | "first-meaningful-paint"
  | "interactive"
  | "largest-contentful-paint"
  | "speed-index"
  | "total-blocking-time";

export type MetricLabel = "CLS" | "FCP" | "FMP" | "TTI" | "LCP" | "SI" | "TBT";
