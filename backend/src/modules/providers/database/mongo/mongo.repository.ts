import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { Model } from 'mongoose';

export class MongoGenericRepository<T> implements IGenericRepository<T, T> {
  private _model: Model<T>;

  constructor(_model: Model<T>) {
    this._model = _model;
  }
  async findById(id: string): Promise<T> {
    return await this._model.findById(id).exec();
  }
  async updateOneById(id: string, item: T) {
    return await this._model.updateOne({ _id: id }, item).exec();
  }
  async findOne(filter: Partial<T>): Promise<T> {
    return await this._model.findOne(filter).exec();
  }
  async deleteOneById(id: string): Promise<any> {
    return await this._model.findByIdAndDelete(id).exec();
  }

  async find(filter: any): Promise<T[]> {
    return await this._model.find(filter).exec();
  }

  async create(item: T): Promise<T> {
    return await this._model.create(item);
  }
}
