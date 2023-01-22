import { Schema } from 'ottoman';

export const reportSchema = new Schema(
  {
    url: { type: String, required: true },
    status: { type: Number, required: true },
    device: { type: String },
    owner: { type: String },
    domain: { type: String },
    page: { type: String },
    audits: { type: Object },
    createdAt: { type: Date },
    payload: { type: Object },
  },
  { timestamps: true },
);
