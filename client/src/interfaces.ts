export interface Domain {
  name: string;
  url: string;
  _id: string;
}

export interface DomainData {
  docs: Domain[];
  totalDocs: number;
}

export enum ReportStatus {
  PENDING = 0,
  DONE = 1,
  ERROR = 2,
}

export interface Audits {
  "first-contentful-paint": number;
  "largest-contentful-paint": number;
  "first-meaningful-paint": number;
  "speed-index": number;
  "total-blocking-time": number;
  "cumulative-layout-shift": number;
  interactive: number;
}

export interface Report {
  _id: string;
  url: string;
  status: ReportStatus;
  device: string;
  tagId: string;
  owner: string;
  domain: string;
  page: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  audits: Audits;
}

export type ReportData = Array<Report>;

export interface DomainSettings {
  name: string;
  url: string;
}

export interface Path {
  device: string;
  url: string;
  tagId: string;
  _id: string;
}

export interface PathSettings {
  tagId: string;
  device: string;
  url: string;
}
export interface TagResponse {
  id: string;
  _id: string;
  name: string;
  color: string;
  isDefaultTag: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  domainId?: string;
  isDefaultTag?: boolean;
}

export interface DashboardMetrics {
  pathCount?: number;
  domainCount?: number;
  lighthouseCount?: number;
}
