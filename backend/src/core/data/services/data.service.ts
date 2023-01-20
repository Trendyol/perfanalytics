import { DomainEntity, PageEntity, ReportEntity, TagEntity } from '../entities';
import { IGenericRepository } from '../repositories/generic.repository';

export abstract class IDataService {
  abstract connection: any;
  abstract domains: IGenericRepository<DomainEntity, DomainEntity>;
  abstract pages: IGenericRepository<PageEntity, PageEntity>;
  abstract tags: IGenericRepository<TagEntity, TagEntity>;
  abstract reports: IGenericRepository<ReportEntity, ReportEntity>;
}
