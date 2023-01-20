import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { Model } from 'mongoose';

export class MongoGenericRepository<T> implements IGenericRepository<T, T> {
  private _model: Model<T>;
  private _populateOnFind: string[];

  constructor(_model: Model<T>, populateOnFind: string[] = []) {
    this._model = _model;
    this._populateOnFind = populateOnFind;
  }
  findById(id: string): Promise<T> {
    return this._model.findById(id).exec();
  }
  updateOneById(id: string, item: T) {
    return this._model.updateOne({ _id: id }, item).exec();
  }
  findOne(filter: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  deleteOneById(id: string): Promise<any> {
    return this._model.findByIdAndDelete(id).exec();
  }

  find(filter: any): Promise<T[]> {
    return this._model.find(filter).populate(this._populateOnFind).exec();
  }

  create(item: T): Promise<T & { _id: string }> {
    return this._model.create(item) as Promise<T & { _id: string }>;
  }
}
