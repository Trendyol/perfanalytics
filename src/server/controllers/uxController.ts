import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../database";
import { collectUx } from "../services";
import { UXDEVICE } from "../types";
import { entryKeySchema, uxTimeSchema } from "../schemas";

export const collectByEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const { content } = await Database.EntryInstance.getEntry(entryKey);

    const uxResult = await collectUx(content.url, UXDEVICE[content.device]);

    const uxKey = uuidv4();
    const uxDocument = {
      type: "ux",
      entryKey,
      date: new Date().getTime(),
      metrics: { ...uxResult },
    };

    await Database.UxInstance.createUx(uxKey, uxDocument);

    return res.json(uxDocument);
  } catch (error) {
    return next(error);
  }
};

export const collectAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await Database.EntryInstance.getEntries();

    entries.map(async (entry) => {
      try {
        const uxResult = await collectUx(entry.Perfanalytics.url, UXDEVICE[entry.Perfanalytics.device]);
        const date = new Date();

        const uxKey = uuidv4();
        const uxDocument = {
          type: "ux",
          entryKey: entry.id,
          date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
          metrics: { ...uxResult },
        };

        return await Database.UxInstance.createUx(uxKey, uxDocument);
      } catch (error) {
        return console.log(error);
      }
    });
    return res.json(entries);
  } catch (error) {
    return console.log(error);
  }
};

export const getUxByEntry = async (req: Request, res: Response, next: NextFunction) => {
  const { entryKey, date } = req.params;

  const validation = uxTimeSchema.validate({ entryKey, date });

  if (validation.error) {
    return next({ message: validation.error.message });
  }

  const uxResult = await Database.UxInstance.getUxByEntry(entryKey, date);

  return res.json(uxResult[0]?.Perfanalytics);
};

export const getUxDates = async (req: Request, res: Response, next: NextFunction) => {
  const { entryKey } = req.params;

  const firstDate = await Database.UxInstance.getUxDates(entryKey);
  let months = [];

  const today = new Date();
  let dayBefore = new Date(firstDate[0]?.date);
  dayBefore.setDate(28);

  while (dayBefore < today) {
    const newDayBefore = new Date(dayBefore);
    months.push(newDayBefore);
    dayBefore = new Date(dayBefore.setMonth(dayBefore.getMonth() + 1));
    dayBefore.setDate(29);
  }

  months = months.map((month: Date) => ({
    value: `${month.getFullYear()}.${month.getMonth() + 1}`,
    label: `${month.toLocaleString("default", { month: "long", year: "numeric" })}`,
  }));

  return res.json(months);
};
