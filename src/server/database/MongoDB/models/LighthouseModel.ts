import mongoose from "mongoose";

const lighthouseSchema = new mongoose.Schema({
  id: String,
  Perfanalytics: {
    type: { type: String },
    status: String,
    entryKey: String,
    date: Number,
    cls: Number,
    fcp: Number,
    fmp: Number,
    lcp: Number,
    prf: Number,
    si: Number,
    tbt: Number,
    tti: Number,
    html: String
  },
});

const Lighthouse = mongoose.model("LighthouseMongoose", lighthouseSchema);

export default Lighthouse;
