import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  id: String,
  Perfanalytics: {
    type: { type: String },
    url: String,
    date: Date,
    device: Number,
    status: String,
    slack_daily: Boolean,
    slack_weekly: Boolean,
    slack_monthly: Boolean,
    slack_prf: Number,
    slack_cls: Number,
    slack_fcp: Number,
    slack_fmp: Number,
    slack_lcp: Number,
    slack_si: Number,
    slack_tbt: Number,
    slack_tti: Number,
    tag: String
  },
});

const Entry = mongoose.model("EntryMongoose", entrySchema);

export default Entry;
