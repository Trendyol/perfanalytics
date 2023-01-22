export interface IGenericRepository<T, R extends T> {
  find(filter: any): Promise<R[]>;
  updateOneById(id: string, item: Partial<R>): void;
  create(options: Exclude<T, 'id'>): any;
  findOne(filter: Partial<T>): Promise<R | undefined>;
  findById(id: string): Promise<R | undefined>;
  deleteOneById(id: string): Promise<any>;
  count(filter: any): Promise<number>;
}
