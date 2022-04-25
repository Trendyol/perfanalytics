export enum DEVICE {
  DESKTOP = 1,
  MOBILE = 2,
}

export enum UXDEVICE {
  DESKTOP = 1,
  PHONE = 2,
}

export interface EntryInputModel {
  url: string;
  device: number;
}

export interface Entry {
  type: string;
  url: string;
  date: Date;
  device: number;
}

export interface EntryDto {
  id: string;
  type: string;
  url: string;
  device: number;
  date: Date;
  lhId?: string;
}

export interface DocumentModel {
  Perfanalytics: Entry;
  id: string;
}

export interface SlackInputModel {
  name: string;
  channelID: string;
  prf: number;
  fcp: number;
  si: number;
  lcp: number;
  fmp: number;
  tbt: number;
  cls: number;
  tti: number;
  freq: FREQ;
}

export enum FREQ {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum STATUS {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAIL = "FAIL",
}

export enum TIMES {
  "daily" = 1,
  "weekly" = 7,
  "monthly" = 30,
}

export enum MetricNames {
  "fcp" = "FCP",
  "si" = "SI",
  "lcp" = "LCP",
  "tti" = "TTI",
  "tbt" = "TBT",
  "cls" = "CLS",
  "fmp" = "FMP",
  "prf" = "Overall Performance",
}

export interface EntryDB {
  createEntry(entryKey: string, document: object): Promise<void>;
  getEntries(): Promise<any>;
  getEntriesBySlackPreferences(scheduleTime: string): Promise<any>;
  getEntry(entryKey: string): Promise<any>;
  updateEntry(entryKey: string, updateObject: object): Promise<any>;
  deleteEntry(entryKey: string): Promise<any>;
  getEntryTags(): Promise<any>;
}

export interface LighthouseDB {
  createLighthouse(lighthouseKey: string, document: object): Promise<void>;
  getByEntry(entryKey: string, startDate: string, endDate: string): Promise<any>;
  updateLighthouse(lighthouse: string, updateObject: object): Promise<any>;
  getStatistics(entryKey: string, startDate: number, endDate: number): Promise<any>;
  clearResults(entryKey: string): Promise<any>;
}

export interface UxDB {
  createUx(uxKey: string, document: object): Promise<void>;
  getUxByEntry(entryKey: string, date: string): Promise<any>;
  getUxDates(entryKey: string): Promise<any>;
}
