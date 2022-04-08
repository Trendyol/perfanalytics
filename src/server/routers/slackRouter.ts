import express from "express";
import { scheduledReport} from "../controllers";

const router = express.Router();

router.get("/:scheduleTime", scheduledReport);

export { router as slackRouter };
