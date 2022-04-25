import express from "express";
import { createEntry, getEntries, getEntry, deleteEntry, updateEntry, getEntryTags } from "../controllers";

const entryRouter = express.Router();

entryRouter.post("/", createEntry);
entryRouter.get("/", getEntries);
entryRouter.get("/tags", getEntryTags);
entryRouter.get("/:entryKey", getEntry);
entryRouter.put("/:entryKey", updateEntry);
entryRouter.delete("/:entryKey", deleteEntry);

export default entryRouter;
