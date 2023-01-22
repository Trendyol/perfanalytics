import { Schema } from 'ottoman';

export const pageSchema = new Schema({
  url: { type: String, required: true },
  device: { type: String, required: true },
  owner: { type: String },
  domain: { type: String },
  tag: { type: String },
});
