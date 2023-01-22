import {
  DomainEntity,
  PageEntity,
  ReportEntity,
  TagEntity,
  UserEntity,
} from '../entities';
import { IGenericRepository } from '../repositories/generic.repository';

export abstract class IDataService {
  abstract connection: any;
  abstract domains: IGenericRepository<DomainEntity, DomainEntity>;
  abstract pages: IGenericRepository<PageEntity, PageEntity>;
  abstract tags: IGenericRepository<TagEntity, TagEntity>;
  abstract reports: IGenericRepository<ReportEntity, ReportEntity>;
  abstract users: IGenericRepository<UserEntity, UserEntity>;
}
