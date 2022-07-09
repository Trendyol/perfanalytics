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
