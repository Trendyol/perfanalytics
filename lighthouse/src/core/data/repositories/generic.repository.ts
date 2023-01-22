export interface IGenericRepository<T, R extends T> {
  find(filter: any): Promise<R[]>;
  updateOneById(id: string, item: Partial<R>): void;
  create(options: Exclude<T, 'id'>): any; //Promise<R & { _id: string }>;
  findOne(filter: Partial<T>): Promise<R | undefined>;
  findById(id: string): Promise<R | undefined>;
  deleteOneById(id: string): Promise<any>;
}
