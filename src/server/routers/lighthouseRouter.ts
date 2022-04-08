import express from "express";
import { runByEntry,getByEntry, runAllEntries,getStatistics,clearResults, getLighthouse } from "../controllers";

const router = express.Router();

router.get("/run", runAllEntries);
router.get("/:lighthouseKey", getLighthouse);
router.get("/run/:entryKey", runByEntry);
router.get("/:entryKey/:startDate/:endDate", getByEntry);
router.get("/statistics/:entryKey", getStatistics);
router.delete("/:entryKey", clearResults)

export { router as lighthouseRouter };
