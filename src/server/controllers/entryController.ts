import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { EntryInputModel, Entry, EntryDto } from "../types";
import Database from "../database";
import { joinChannel, postMessage } from "../services";
import { createEntrySchema, entryKeySchema, tagSchema } from "../schemas";

export const createEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url, device } = req.body as EntryInputModel;

    const validation = createEntrySchema.validate({ url, device });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const docKey = uuidv4();

    const document: Entry = {
      type: "entry",
      url,
      date: new Date(),
      device,
    };

    await Database.EntryInstance.createEntry(docKey, document);

    const entryDto: EntryDto = {
      id: docKey,
      ...document,
    };

    return res.json(entryDto).status(201);
  } catch (error) {
    return next(error);
  }
};

export const getEntries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tag } = req.query;

    const validation = tagSchema.validate({ tag });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const entries = await Database.EntryInstance.getEntries(tag);

    const result = [];
    entries.forEach((doc: any) => {
      const entryDto: EntryDto = {
        ...doc.Perfanalytics,
        id: doc.id,
      };
      result.push(entryDto);
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const document = await Database.EntryInstance.getEntry(entryKey);

    return res.json(document);
  } catch (error) {
    return next(error);
  }
};

export const updateEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;
    const newEntryFields = req.body;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const result = await Database.EntryInstance.updateEntry(entryKey, newEntryFields);

    const { slackChannel } = newEntryFields;
    if (slackChannel) {
      try {
        await joinChannel(slackChannel);
      } catch (error) {
        console.log(error);
      }
    }

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    const result = await Database.EntryInstance.deleteEntry(entryKey);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

export const getEntryTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Database.EntryInstance.getEntryTags();

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};
