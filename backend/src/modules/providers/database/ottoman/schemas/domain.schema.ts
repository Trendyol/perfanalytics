import { Schema } from 'ottoman';

export const domainSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  owner: { type: String },
});
