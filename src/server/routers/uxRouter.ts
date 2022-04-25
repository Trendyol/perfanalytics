import express from "express";
import { collectAll, collectByEntry, getUxDates, getUxByEntry } from "../controllers";

const uxRouter = express.Router();

uxRouter.get("/collect/:entryKey", collectByEntry);
uxRouter.get("/dates/:entryKey", getUxDates);
uxRouter.get("/:entryKey/:date", getUxByEntry);
uxRouter.get("/collect", collectAll);

export default uxRouter;
