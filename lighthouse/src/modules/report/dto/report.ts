import { ReportEntity } from '@core/data/entities';

export class Report implements ReportEntity {
  _id?: string;
  url: string;
  status: number;
  device: string;
  owner: string;
  domain: string;
  page: string;
  audits: object;
}
