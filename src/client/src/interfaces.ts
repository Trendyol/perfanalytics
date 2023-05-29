export interface Entry {
  date: string;
  device: number;
  id: string;
  status: string;
  type: string;
  url: string;
  slackChannel: string;
  tag: string;
  cookie: string;
  slack_daily: boolean;
  slack_weekly: boolean;
  slack_monthly: boolean;
  slack_fcp: number;
  slack_fmp: number;
  slack_lcp: number;
  slack_prf: number;
  slack_si: number;
  slack_tbt: number;
  slack_tti: number;
  slack_cls: number;
}

export interface LighthouseResult {
  cls: number;
  date: number;
  entryKey: string;
  fcp: number;
  fmp: number;
  html: string;
  id: string;
  lcp: number;
  prf: number;
  si: number;
  status: string;
  tbt: number;
  tti: number;
  type: string;
}

export interface Tag {
  tag: string;
}

export interface SlackMetrics {
  slack_prf: number;
  slack_fcp: number;
  slack_si: number;
  slack_lcp: number;
  slack_fmp: number;
  slack_tbt: number;
  slack_cls: number;
  slack_tti: number;
}

export interface LhStatistic {
  name: string;
  percentDiff: number;
  score: number;
}
