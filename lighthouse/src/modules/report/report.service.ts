import { Injectable } from '@nestjs/common';
import * as chromeLauncher from 'chrome-launcher';
import * as lighthouseRunner from 'lighthouse';
import { Status, Device } from './models/enums';
import {
  defaultChromeFlags,
  defaultOptions,
  usefulAudits,
  deviceConfig,
  REPEAT_COUNT,
  allAudits,
} from './models/constants';
import { IDataService } from '@core/data/services/data.service';
import { ReportEvent } from './events/report.event';
import { Report } from './dto/report';
import { IStorageService } from '@core/data/services/storage.service';
import { Audits } from './models/types';

@Injectable()
export class ReportService {
  constructor(
    private readonly dataService: IDataService,
    private readonly storageService: IStorageService,
  ) {}

  async createReport(reportEvent: ReportEvent) {
    const report = await this.dataService.reports.create({
      status: Status.PENDING,
      domain: reportEvent.domain,
      page: reportEvent.page,
      url: reportEvent.url,
      device: reportEvent.device,
      owner: reportEvent.owner,
      payload: reportEvent.payload,
      audits: {},
      createdAt: new Date(),
    });
    await this.calculateAudits(report);
  }

  async calculateAudits(report: Report) {
    let repeat = 0;
    const reportObj: Partial<Report> = {
      audits: {},
      html: [],
      status: Status.PENDING,
    };
    const auditsResult: Audits[] = [];

    while (repeat < REPEAT_COUNT) {
      const { status, audits, html } = await this.runLighthouse(report);
      auditsResult[repeat] = audits;
      reportObj.html.push(html);
      reportObj.status |= status;

      repeat += 1;
    }

    allAudits.forEach((audit) => {
      let total = 0;
      auditsResult.forEach((res) => (total += res[audit]));
      reportObj.audits[audit] = total / REPEAT_COUNT;
    });

    this.dataService.reports.updateOneById(report._id, reportObj);
  }

  async runLighthouse(report: Report) {
    let status = Status.PENDING;
    const audits: Audits = {};
    let html: string;

    const chrome = await chromeLauncher.launch({
      chromeFlags: defaultChromeFlags,
    });

    const options = {
      ...defaultOptions,
      port: chrome.port,
    };

    try {
      const runnerResult = await lighthouseRunner(
        report.url,
        options,
        deviceConfig[report.device?.toLowerCase()] ||
          deviceConfig[Device.DESKTOP],
      );

      const hasRuntimeError =
        typeof runnerResult.lhr.runtimeError !== 'undefined';

      if (hasRuntimeError || !runnerResult.lhr || !runnerResult.lhr.audits)
        throw runnerResult.lhr.runtimeError.code;

      usefulAudits.map((audit) => {
        audits[audit] = runnerResult.lhr.audits[audit]?.score;
      });

      audits.performance = runnerResult.lhr.categories.performance.score;
      html = await this.storageService.upload(runnerResult.report, report._id);
      status = Status.DONE;
    } catch (e) {
      console.error('Error: ', e);
      status = Status.ERROR;
    }

    chrome.kill();

    return {
      status,
      audits,
      html,
    };
  }
}
