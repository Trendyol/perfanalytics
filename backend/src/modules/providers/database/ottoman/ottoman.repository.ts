import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { IDocument, ModelTypes, Ottoman } from 'ottoman';

export type Document<T> = IDocument<T> & T & { id: string };

export class OttomanGenericRepository<T>
  implements IGenericRepository<T, Document<T>>
{
  constructor(
    private _model: ModelTypes<T, Document<T>>,
    private connection: Ottoman,
  ) {}
  async create(options: Exclude<T, 'id'>): Promise<T> {
    return await this._model.create(options);
  }
  async find(filter: any): Promise<Document<T>[]> {
    let result = [];
    try {
      result = (await this._model.find(filter)).rows;
    } catch (error) {}
    return result;
  }
  async updateOneById(
    id: string,
    item: Partial<Document<T>>,
  ): Promise<Document<T>> {
    return await this._model.findOneAndUpdate({ _id: id }, item);
  }
  async findById(id: string): Promise<Document<T>> {
    let result = null;

    try {
      result = await this._model.findOne({ _id: id });
    } catch (error) {}

    return result;
  }
  async deleteOneById(id: string): Promise<any> {
    return await this._model.removeById(id);
  }
  async getAll() {
    const result = await this._model.find();
    return result.rows;
  }
  async findOne(filter: Partial<T>) {
    let result = null;

    try {
      result = await this._model.findOne(filter, { ignoreCase: true });
    } catch (error) {}

    return result;
  }

  async count(filter: any): Promise<number> {
    return await this._model.count(filter);
  }
}
