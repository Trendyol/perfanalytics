import fs from "fs";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import compression from "compression";
import rateLimit from "express-rate-limit";
import express, { NextFunction, Request, Response } from "express";
import { entryRouter, lighthouseRouter, slackRouter, uxRouter } from "./routers";

dotenv.config();

const app = express();

const dashboardPath = path.join(__dirname, "../client/");

const covertMinsToMs = (min: number): number => min * 60 * 1000;

const limiter = rateLimit({
  windowMs: covertMinsToMs(1),
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(express.static(dashboardPath));
app.use(limiter);

app.get("/healthcheck", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/entry", entryRouter);
app.use("/slack", slackRouter);
app.use("/ux", uxRouter);
app.use("/lighthouse", lighthouseRouter);
app.use("/lh/:lhKey", (req, res) => {
  const { lhKey } = req.params;
  const filePath = path.join(__dirname, `./lh_results/${lhKey}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendStatus(404);
  }
});

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error", error.message);
  return res.json({ error: error.message }).status(500);
};

app.use(errorHandler);

app.get("*", (req: Request, res: Response) => res.sendFile(`${dashboardPath}index.html`));

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
