import express from "express";
import { runByEntry, getByEntry, runAllEntries, getStatistics, clearResults, getLighthouse } from "../controllers";

const lighthouseRouter = express.Router();

lighthouseRouter.get("/run", runAllEntries);
lighthouseRouter.get("/:lighthouseKey", getLighthouse);
lighthouseRouter.get("/run/:entryKey", runByEntry);
lighthouseRouter.get("/:entryKey/:startDate/:endDate", getByEntry);
lighthouseRouter.get("/statistics/:entryKey", getStatistics);
lighthouseRouter.delete("/:entryKey", clearResults);

export default lighthouseRouter;
