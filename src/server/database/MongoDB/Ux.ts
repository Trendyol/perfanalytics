import { UxDB } from "../../types";
import UxModel from "./models/UxModel";

class _Ux implements UxDB {
  // TODO: We might want to review this ux queries for our purpose later
  getUxDates = async (entryKey: string): Promise<any>  => {
    const result = await UxModel.find({ "Perfanalytics.entryKey": entryKey }).sort({ "Perfanalytics.date": 1 }).limit(1);
    return result;
  };

  getUxByEntry = async (entryKey: string, date: string): Promise<any>  => {
    const result = await UxModel.find({ $and: [{ "Perfanalytics.entryKey": entryKey }, { "Perfanalytics.date": date }] })
      .sort({ "Perfanalytics.date": 1 })
      .limit(1);

    return result;
  };

  createUx = async (uxKey: string, document: {}): Promise<any>  => {
    const ux = new UxModel({ id: uxKey, Perfanalytics: document });
    await ux.save();
  };
}

export const Ux = new _Ux();
