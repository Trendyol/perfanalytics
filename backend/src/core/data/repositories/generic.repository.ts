export interface IGenericRepository<T, R extends T> {
  find(filter: any): Promise<R[]>;
  updateOneById(id: string, item: Partial<T>): void;
  create(options: Exclude<T, 'id'>): Promise<R>;
  findOne(filter: Partial<T>): Promise<R | undefined>;
  findById(id: string): Promise<R | undefined>;
  deleteOneById(id: string): Promise<any>;
}
