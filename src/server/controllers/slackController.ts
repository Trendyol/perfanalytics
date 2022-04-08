import { NextFunction, Request, Response } from "express";
const { WebClient } = require("@slack/web-api");

import Database from "../database";
const { SLACK_TOKEN } = process.env;
import { postMessage } from "../services";
import { TIMES, MetricNames } from "../types";
import { buildReportBlocks } from "../services/slackService";
import { scheduleTimeSchema } from "../schemas";

export const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const web = new WebClient(SLACK_TOKEN);

    await web.conversations.join({
      token: SLACK_TOKEN,
      channel: "C026NB3FB5Y",
    });

    await web.chat.postMessage({
      channel: "C026NB3FB5Y",
      text: `Slack test message`,
    });

    res.send("OK");
  } catch (error) {
    next(error);
  }
};

export const scheduledReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { scheduleTime } = req.params;

    const validation = scheduleTimeSchema.validate({ scheduleTime });

    if (validation.error) {
      return next({ message: validation.error.message });
    }

    let nowTime = new Date().getTime();

    let limit = new Date();
    limit.setDate(limit.getDate() - TIMES[scheduleTime]);
    const limitTime = limit.getTime();

    let limitBefore = new Date();
    limitBefore.setDate(limitBefore.getDate() - TIMES[scheduleTime] * 2);
    const limitBeforeTime = limitBefore.getTime();

    const entries = await Database.Entry.getEntriesBySlackPreferences(scheduleTime);

    const metricsList = ["fcp", "si", "lcp", "tti", "tbt", "cls", "fmp", "prf"];

    entries.forEach(async (entry) => {
      let metrics = (await Database.Lighthouse.getStatistics(entry.id, limitTime, nowTime, metricsList)) as any;
      let oldMetrics = (await Database.Lighthouse.getStatistics(
        entry.id,
        limitBeforeTime,
        limitTime,
        metricsList
      )) as any;

      let scores = metricsList.map((metric) => {
        const score = metrics[metric];
        const oldScore = oldMetrics[metric];
        const percentDiff = oldScore > 0 && score > 0 ? ((score - oldScore) / oldScore) * 100 : "-";
        return { name: MetricNames[metric], score: score, percentDiff };
      });

      const slackMessage = buildReportBlocks(scheduleTime, entry, scores);

      await postMessage(entry.Perfanalytics.slackChannel, slackMessage);
    });

    res.json(entries);
  } catch (error) {
    next(error);
  }
};
