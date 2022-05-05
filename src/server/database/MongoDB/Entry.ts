import { EntryDB } from "../../types";
import EntryModel from "./models/EntryModel";

class Entry implements EntryDB {
  getEntryTags = async () => {
    const result = await EntryModel.find().distinct("Perfanalytics.tag");
    const tags = result.map((tag) => ({
      tag,
    }));
    return tags;
  };

  getEntriesBySlackPreferences = async (scheduleTime: string): Promise<any> => {
    const schedule = `Perfanalytics.slack_${scheduleTime}`;

    const result = await EntryModel.find({
      $and: [{ [schedule]: true }, { "Perfanalytics.slackChannel": { $ne: "null" } }],
    });

    return result;
  };

  createEntry = async (entryKey: string, document: object) => {
    const entry = new EntryModel({ id: entryKey, Perfanalytics: document });
    await entry.save();
  };

  getEntries = async (tag?: any) => {
    const query = {};
    if (tag) {
      query["Perfanalytics.tag"] = tag;
    }
    const entries = await EntryModel.find(query).sort({ "Perfanalytics.url": 1 });
    return entries;
  };

  getEntry = async (entryKey: string) => {
    const entry = await EntryModel.findOne({ id: entryKey });
    return {
      content: {
        ...entry.Perfanalytics,
      },
    } as any;
  };

  updateEntry = async (entryKey: string, updateObject: object) => {
    const modifiedUpdateObject = {};

    Object.entries(updateObject).forEach(([key, value]) => {
      const modifiedKey = `Perfanalytics.${key}`;
      modifiedUpdateObject[modifiedKey] = value;
    });

    const result = await EntryModel.updateOne({ id: entryKey }, { $set: modifiedUpdateObject });

    return result;
  };

  deleteEntry = async (entryKey: string) => {
    const result = await EntryModel.deleteOne({ id: entryKey });
    return result;
  };
}

const EntryInstance = new Entry();

export default EntryInstance;
