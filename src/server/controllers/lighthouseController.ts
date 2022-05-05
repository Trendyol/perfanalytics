/* eslint-disable testing-library/no-await-sync-query */
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import lighthouse from "lighthouse";
import { checkMetrics } from "../services";
import chromeInstance from "../helpers/chrome";

import { EntryDto, STATUS, DEVICE } from "../types";
import cdnUploader from "../helpers/cdnUploader";
import Database from "../database";
import queue from "../helpers/queue";
import { entryKeySchema, getLighthouseSchema } from "../schemas";

import * as constants from "../lighthouseconstants";

export const runByEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;
    const { content } = await Database.EntryInstance.getEntry(entryKey);

    const initalLhResult = await initLighthouseResult(entryKey);
    const saveFunc = () => saveLighthouseResult(content, initalLhResult.id, entryKey);
    queue.enqueue(saveFunc);

    res.json(initalLhResult);
  } catch (error) {
    next(error);
  }
};

export const getLighthouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lighthouseKey } = req.params;

    const document = await Database.LighthouseInstance.getLighthouse(lighthouseKey);

    res.json(document);
  } catch (error) {
    next(error);
  }
};

const runLighthouse = async (entry: any, lhKey: string) => {
  const { chrome } = await chromeInstance.runChrome();

  const options = {
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };

  let config: any = {
    extends: "lighthouse:default",
    settings: {
      maxWaitForFcp: 60 * 1000,
      maxWaitForLoad: 60 * 1000,
      formFactor: "desktop",
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
    },
  };
  if (entry.device === DEVICE.MOBILE) {
    config = {
      extends: "lighthouse:default",
      settings: {
        maxWaitForFcp: 60 * 1000,
        maxWaitForLoad: 60 * 1000,
        formFactor: "mobile",
        screenEmulation: constants.screenEmulationMetrics.mobile,
        emulatedUserAgent: constants.userAgents.mobile,
        skipAudits: ["uses-http2"],
      },
    };
  }

  const runnerResult = await lighthouse(entry.url, options, config);

  try {
    const reportHtml = runnerResult.report;
    const filePath = path.join(__dirname, `../lh_results/${lhKey}.html`);

    runnerResult.html = await cdnUploader(filePath, reportHtml, lhKey);
  } catch (error) {
    console.log("error", error);
  }

  return runnerResult;
};

export const getByEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey, startDate, endDate } = req.params;

    const validation = getLighthouseSchema.validate({ entryKey, startDate, endDate });

    if (validation.error) {
      next({ message: validation.error.message });
    }

    const result = [];

    const entries = await Database.LighthouseInstance.getByEntry(entryKey, startDate, endDate);

    entries.forEach((doc: any) => {
      const lhDto = {
        ...doc.Perfanalytics,
        id: doc.id,
      };
      result.push(lhDto);
    });

    if (result.length === 0) {
      res.send().status(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const runAllEntries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await Database.EntryInstance.getEntries();
    const result = [];

    const promises = new Promise((resolve, reject) => {
      entries.forEach(async (doc: any, index) => {
        const initalLhResult = await initLighthouseResult(doc.id);
        const entryDto: EntryDto = {
          ...doc.Perfanalytics,
          id: doc.id,
          lhId: initalLhResult.id,
        };
        result.push(entryDto);
        if (result.length === entries.length) {
          resolve(result);
        }
      });
    });
    promises.then(() => {
      runRecursively(result);
    });

    res.send("Process started.");
  } catch (error) {
    next(error);
  }
};

const runRecursively = async (result: EntryDto[]) => {
  const entry = result.pop();

  console.log(entry.url, "Started");

  const saveFunc = () => saveLighthouseResult(entry, entry.lhId, entry.id);
  queue.enqueue(saveFunc);

  if (result.length === 0) {
    return;
  }

  runRecursively(result);
};

const saveLighthouseResult = async (entry: any, lhKey: string, entryKey: string) => {
  console.log("Started:", entry.url);
  await Database.LighthouseInstance.updateLighthouse(lhKey, { status: STATUS.RUNNING });

  try {
    const runnerResult = await runLighthouse(entry, lhKey);

    const { html } = runnerResult;

    const { audits } = runnerResult.lhr;
    const prf = runnerResult.lhr.categories.performance.score * 100;

    const fcp = audits["first-contentful-paint"].score * 100;
    const si = audits["speed-index"].score * 100;
    const lcp = audits["largest-contentful-paint"].score * 100;
    const fmp = audits["first-meaningful-paint"].score * 100;
    const tbt = audits["total-blocking-time"].score * 100;
    const cls = audits["cumulative-layout-shift"].score * 100;
    const tti = audits.interactive.score * 100;

    const hasRuntimeError = typeof runnerResult.lhr.runtimeError !== "undefined";

    if (hasRuntimeError) {
      throw runnerResult.lhr.runtimeError.code;
    }

    const isRedirected = audits.redirects.details?.items?.length > 0;

    if (isRedirected) {
      throw new Error("Redirected");
    }

    await Database.LighthouseInstance.updateLighthouse(lhKey, {
      status: STATUS.DONE,
      prf,
      fcp,
      si,
      lcp,
      fmp,
      tbt,
      cls,
      tti,
      html,
    });
    await Database.EntryInstance.updateEntry(entryKey, { status: STATUS.DONE });

    if (entry.slackChannel !== null) {
      checkMetrics(entry, { fcp, si, lcp, fmp, tbt, cls, tti, prf }, entryKey);
    }
  } catch (error) {
    console.log(error);
    await Database.LighthouseInstance.updateLighthouse(lhKey, { status: STATUS.FAIL });
    await Database.EntryInstance.updateEntry(entryKey, { status: STATUS.FAIL });
  }
};

const initLighthouseResult = async (entryKey: string) => {
  const lhKey = uuidv4();

  const lhDocument = {
    type: "lighthouse",
    entryKey,
    date: new Date().getTime(),
    status: `${STATUS.PENDING}`,
    prf: null,
    fcp: null,
    si: null,
    lcp: null,
    fmp: null,
    tbt: null,
    cls: null,
    tti: null,
  };

  await Database.LighthouseInstance.createLighthouse(lhKey, lhDocument);

  return {
    id: lhKey,
    ...lhDocument,
  };
};

export const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
  const { entryKey } = req.params;
  const { day } = req.query as any;

  const validation = entryKeySchema.validate({ entryKey });

  if (validation.error) {
    next({ message: validation.error.message });
  }

  const metricsList = ["fcp", "si", "lcp", "tti", "tbt", "cls", "fmp", "prf"];

  if (day === "ALL") {
    const metrics = (await Database.LighthouseInstance.getStatistics(entryKey, 0, Date.now(), metricsList)) as any;
    const scores = metricsList.map((metric) => {
      const score = metrics[metric];
      return {
        name: metric,
        score,
        percentDiff: "-",
      };
    });
    res.json(scores);
  }
  const nowTime = new Date().getTime();

  const limit = new Date();
  limit.setDate(limit.getDate() - day);
  const limitTime = limit.getTime();

  const limitBefore = new Date();
  limitBefore.setDate(limitBefore.getDate() - day * 2);
  const limitBeforeTime = limitBefore.getTime();

  const metrics = (await Database.LighthouseInstance.getStatistics(entryKey, limitTime, nowTime, metricsList)) as any;
  const oldMetrics = (await Database.LighthouseInstance.getStatistics(
    entryKey,
    limitBeforeTime,
    limitTime,
    metricsList
  )) as any;

  const scores = metricsList.map((metric) => {
    const score = metrics?.[metric] || 0;
    const oldScore = oldMetrics?.[metric] || 0;
    const percentDiff = oldScore > 0 && score > 0 ? ((score - oldScore) / oldScore) * 100 : "-";
    return {
      name: metric,
      score,
      percentDiff,
    };
  });

  res.json(scores);
};

export const clearResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { entryKey } = req.params;

    const validation = entryKeySchema.validate({ entryKey });

    if (validation.error) {
      next({ message: validation.error.message });
    }

    const document = await Database.LighthouseInstance.clearResults(entryKey);

    res.send("OK").status(200);
  } catch (error) {
    next(error);
  }
};
