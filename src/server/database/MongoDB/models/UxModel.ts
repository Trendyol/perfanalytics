import mongoose from "mongoose";

const uxSchema = new mongoose.Schema({
  id: String,
  Perfanalytics: {
    type: { type: String },
    date: String,
    entryKey: String,
    metrics: Object,
  },
});

const Ux = mongoose.model("UxMongoose", uxSchema);

export default Ux;
