import Joi from "joi";

const validSchemaTextRegex = /^[\w-]+(?:\s+\w+)*$/;

export const createEntrySchema = Joi.object().keys({
  url: Joi.string().uri().required(),
  device: Joi.number().required(),
});

export const tagSchema = Joi.object().keys({
  tag: Joi.string().pattern(validSchemaTextRegex),
});

export const entryKeySchema = Joi.object().keys({
  entryKey: Joi.string().pattern(validSchemaTextRegex),
});

export const getLighthouseSchema = Joi.object().keys({
  entryKey: Joi.string().pattern(validSchemaTextRegex),
  startDate: Joi.number(),
  endDate: Joi.number(),
});

export const scheduleTimeSchema = Joi.object().keys({
  scheduleTime: Joi.string().pattern(validSchemaTextRegex),
});

export const uxTimeSchema = Joi.object().keys({
  entryKey: Joi.string().pattern(validSchemaTextRegex),
  date: Joi.string().pattern(validSchemaTextRegex),
});
