export abstract class BaseService {
  abstract canAccess: (userId: string, item: any) => void;
}
