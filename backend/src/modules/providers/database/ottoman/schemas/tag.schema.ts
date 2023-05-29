import { Schema } from 'ottoman';

export const tagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readonly: { type: Boolean },
  user: { type: String },
  domain: { type: String },
  owner: { type: String },
});
