export interface Domain {
  name?: string;
  email?: string;
}

export interface DomainData {
  docs: Domain[];
  totalDocs: number;
}
