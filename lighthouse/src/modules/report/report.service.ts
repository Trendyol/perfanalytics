import { Injectable } from '@nestjs/common';
import * as chromeLauncher from 'chrome-launcher';
import * as lighthouseRunner from 'lighthouse';
import { Status, Device } from './enums';
import {
  defaultChromeFlags,
  defaultOptions,
  usefulAudits,
  deviceConfig,
} from './constants';
import { IDataService } from '@core/data/services/data.service';
import { ReportEvent } from './events/report.event';
import { Report } from './dto/report';
import { IStorageService } from '@core/data/services/storage.service';

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

    await this.runLighthouse(report);
  }

  async runLighthouse(report: Report) {
    const reportObj: Partial<Report> = {};

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

      const audits = {};
      Object.keys(runnerResult.lhr.audits).map((auditKey) => {
        if (usefulAudits.includes(auditKey)) {
          audits[runnerResult.lhr.audits[auditKey]?.id] =
            runnerResult.lhr.audits[auditKey]?.score;
        }
      });
      audits['performance'] = runnerResult.lhr.categories.performance.score;

      const hasRuntimeError =
        typeof runnerResult.lhr.runtimeError !== 'undefined';

      if (hasRuntimeError) throw runnerResult.lhr.runtimeError.code;

      reportObj.audits = audits;
      const html = await this.storageService.upload(
        runnerResult.report,
        report._id,
      );
      reportObj.html = html;
      reportObj.status = Status.DONE;
    } catch (e) {
      console.error('Error: ', e);
      reportObj.status = Status.ERROR;
    }
    this.dataService.reports.updateOneById(report._id, reportObj);

    chrome.kill();
  }
}
