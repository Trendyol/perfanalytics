export interface Domain {
  name: string;
  url: string;
  _id: string;
}

export interface DomainData {
  docs: Domain[];
  totalDocs: number;
}

export interface DomainSettings {
  name: string;
  url: string;
}

export interface Page {
  device: string;
  url: string;
  _id: string;
}

export interface PageSettings {
  device: string;
  url: string;
}
export interface TagResponse {
  _id: string;
  name: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  domainId: string;
}

export interface DashboardMetrics {
  pageCount?: number;
  domainCount?: number;
}