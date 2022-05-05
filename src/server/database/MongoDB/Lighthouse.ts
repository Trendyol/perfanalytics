import { LighthouseDB } from "../../types";
import LighthouseModel from "./models/LighthouseModel";

class Lighthouse implements LighthouseDB {
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
          ...formattedMetrics,
        },
      },
    ]);

    return result[0];
  };

  createLighthouse = async (lighthouseKey: string, document: object) => {
    const lighthouse = new LighthouseModel({ id: lighthouseKey, Perfanalytics: document });
    await lighthouse.save();
  };

  updateLighthouse = async (lighthouseKey: string, updateObject: object) => {
    const modifiedUpdateObject = {};

    Object.entries(updateObject).forEach(([key, value]) => {
      const modifiedKey = `Perfanalytics.${key}`;
      modifiedUpdateObject[modifiedKey] = value;
    });

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

const LighthouseInstance = new Lighthouse();

export default LighthouseInstance;
