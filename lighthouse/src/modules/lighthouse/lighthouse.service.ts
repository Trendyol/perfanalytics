import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lighthouse } from './dto/lighthouse.schema';
import * as chromeLauncher from 'chrome-launcher';
import * as lighthouseRunner from 'lighthouse';
import { Status, Device } from './enums';
import { LighthouseMessage } from './dto/lighthouse.payload';
import {
  defaultChromeFlags,
  defaultOptions,
  usefulAudits,
  deviceConfig,
} from './constants';

@Injectable()
export class LighthouseService {
  constructor(
    @InjectModel('Lighthouse')
    private readonly lighthouseModel: Model<Lighthouse>,
  ) {}

  async initLighthouse(lighthouseMessage: LighthouseMessage) {
    const lighthouse = await this.lighthouseModel.create({
      status: Status.PENDING,
      domain: lighthouseMessage.domainId,
      page: lighthouseMessage.pageId,
      audits: {},
      ...lighthouseMessage,
    });

    await this.runLighthouse(lighthouse);
  }

  async runLighthouse(lighthouse: Lighthouse) {
    const chrome = await chromeLauncher.launch({
      chromeFlags: defaultChromeFlags,
    });

    const options = {
      ...defaultOptions,
      port: chrome.port,
    };

    try {
      const runnerResult = await lighthouseRunner(
        lighthouse.url,
        options,
        deviceConfig[lighthouse.device] || Device.DESKTOP,
      );

      lighthouse.audits.performance =
        runnerResult.lhr.categories.performance.score;

      const audits = {};
      Object.keys(runnerResult.lhr.audits).map((auditKey) => {
        if (usefulAudits.includes(auditKey)) {
          audits[runnerResult.lhr.audits[auditKey]?.id] =
            runnerResult.lhr.audits[auditKey]?.score;
        }
      });

      const hasRuntimeError =
        typeof runnerResult.lhr.runtimeError !== 'undefined';

      if (hasRuntimeError) {
        throw runnerResult.lhr.runtimeError.code;
      }

      lighthouse.audits = audits;
      lighthouse.status = Status.DONE;
    } catch {
      lighthouse.status = Status.ERROR;
    }

    await lighthouse.save();

    chrome.kill();
  }
}
