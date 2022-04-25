import express from "express";
import { scheduledReport } from "../controllers";

const slackRouter = express.Router();

slackRouter.get("/:scheduleTime", scheduledReport);

export default slackRouter;
