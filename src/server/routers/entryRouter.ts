import express from "express";
import { createEntry, getEntries, getEntry, deleteEntry, updateEntry, getEntryTags } from "../controllers";

const router = express.Router();

router.post("/", createEntry);
router.get("/", getEntries);
router.get("/tags", getEntryTags);
router.get("/:entryKey", getEntry);
router.put("/:entryKey", updateEntry);
router.delete("/:entryKey", deleteEntry);

export { router as entryRouter };
