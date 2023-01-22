export class ReportEntity {
  url: string;
  status?: number;
  device: string;
  owner: string;
  domain: string;
  page: string;
  audits: object;
  createdAt: Date;
}
