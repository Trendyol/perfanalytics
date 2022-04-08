import { LighthouseDB } from "../../types";
import LighthouseModel from "./models/LighthouseModel";

class _Lighthouse implements LighthouseDB {
  clearResults = async (entryKey: string) => {
    await LighthouseModel.deleteMany({ "Perfanalytics.entryKey": entryKey });
  };

  getStatistics = async (entryKey: string, startDate?: number, endDate?: number, metrics?: any[]) => {
    const formattedMetrics = {};
    metrics.forEach((metric) => {
      formattedMetrics[metric] = { $avg: `$Perfanalytics.${metric}` };
    });

    const result = await LighthouseModel.aggregate([
      {
        $match: {
          $and: [
            { "Perfanalytics.date": { $gt: Number(startDate) } },
            { "Perfanalytics.date": { $lt: Number(endDate) } },
            { "Perfanalytics.entryKey": entryKey },
          ],
        },
      },
      {
        $group: {
          _id: {
            Perfanalytics: {
              entryKey: `${entryKey}`,
            },
          },
          ...formattedMetrics
        },
      },
    ]);

    return result[0];
  };

  createLighthouse = async (lighthouseKey: string, document: {}) => {
    const lighthouse = new LighthouseModel({ id: lighthouseKey, Perfanalytics: document });
    await lighthouse.save();
  };

  updateLighthouse = async (lighthouseKey: string, updateObject: string) => {
    let modifiedUpdateObject = {};
    for (let [key, value] of Object.entries(updateObject)) {
      const modifiedKey = "Perfanalytics." + key;
      modifiedUpdateObject[modifiedKey] = value;
    }
    const result = await LighthouseModel.updateOne({ id: lighthouseKey }, { $set: modifiedUpdateObject });

    return result;
  };

  getLighthouse = async (lighthouseKey: string) => {
    const entry = await LighthouseModel.findOne({ id: lighthouseKey });
    return {
      content: {
        ...entry.Perfanalytics,
      },
    } as any;
  };

  getByEntry = async (entryKey: string, startDate: string, endDate: string) => {
    const result = await LighthouseModel.find({
      $and: [
        { "Perfanalytics.date": { $gt: Number(startDate) } },
        { "Perfanalytics.date": { $lt: Number(endDate) } },
        { "Perfanalytics.entryKey": entryKey },
      ],
    }).sort({ "Perfanalytics.date": -1 });

    return result;
  };
}

export const Lighthouse = new _Lighthouse();
