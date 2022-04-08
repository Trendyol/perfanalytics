import express from "express";
import { collectAll, collectByEntry, getUxDates, getUxByEntry } from "../controllers";

const router = express.Router();

router.get("/collect/:entryKey", collectByEntry);
router.get("/dates/:entryKey", getUxDates);
router.get("/:entryKey/:date", getUxByEntry);
router.get("/collect", collectAll);

export { router as uxRouter };
