import { NextFunction, Request, Response } from "express";
import Database from "../database";
import { collectUx } from "../services";
import { v4 as uuidv4 } from "uuid";
import { UXDEVICE } from "../types";
import { entryKeySchema, uxTimeSchema } from "../schemas";

export const collectByEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const { content } = await Database.Entry.getEntry(entryKey);

    const uxResult = await collectUx(content.url, UXDEVICE[content.device]);

    const uxKey = uuidv4();
    const uxDocument = {
      type: "ux",
      entryKey: entryKey,
      date: new Date().getTime(),
      metrics: { ...uxResult },
    };

    await Database.Ux.createUx(uxKey, uxDocument);

    return res.json(uxDocument);
  } catch (error) {
    next(error);
  }
};

export const collectAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await Database.Entry.getEntries();

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

        await Database.Ux.createUx(uxKey, uxDocument);
      } catch (error) {
        console.log(error);
      }
    });
    return res.json(entries);
  } catch (error) {
    console.log(error);
  }
};

export const getUxByEntry = async (req: Request, res: Response, next: NextFunction) => {
  const { entryKey, date } = req.params;

  const validation = uxTimeSchema.validate({ entryKey, date });

  if (validation.error) {
    return next({ message: validation.error.message });
  }

  let uxResult = await Database.Ux.getUxByEntry(entryKey, date);

  res.json(uxResult[0]?.Perfanalytics);
};

export const getUxDates = async (req: Request, res: Response, next: NextFunction) => {
  const { entryKey } = req.params;

  let firstDate = await Database.Ux.getUxDates(entryKey);
  let months = [];

  const today = new Date();
  let dayBefore = new Date(firstDate[0]?.date);
  dayBefore.setDate(28);

  while (dayBefore < today) {
    let newDayBefore = new Date(dayBefore);
    months.push(newDayBefore);
    dayBefore = new Date(dayBefore.setMonth(dayBefore.getMonth() + 1));
    dayBefore.setDate(29);
  }

  months = months.map((month: Date) => {
    return {
      value: `${month.getFullYear()}.${month.getMonth() + 1}`,
      label: `${month.toLocaleString("default", { month: "long", year: "numeric" })}`,
    };
  });

  res.json(months);
};
