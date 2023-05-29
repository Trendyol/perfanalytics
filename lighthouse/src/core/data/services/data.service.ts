import { ReportEntity } from '../entities';
import { IGenericRepository } from '../repositories/generic.repository';

export abstract class IDataService {
  abstract reports: IGenericRepository<ReportEntity, ReportEntity>;
}
