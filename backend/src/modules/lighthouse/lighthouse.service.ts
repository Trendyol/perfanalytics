import { Page } from '@modules/page/etc/page.schema';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Producer } from 'kafkajs';
import { Model } from 'mongoose';
import { Domain } from '@modules/domain/etc/domain.schema';
@Injectable()
export class LighthouseService {
  constructor(
    @Inject('KafkaProducer') private readonly kafkaProducer: Producer,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const pages = await this.getPages();

    pages.forEach((page) => {
      const lighthousePayload = {
        fullUrl: page.domain.url + page.url,
        pageId: page._id,
      };

      this.sendMessage(lighthousePayload);
    });
  }

  async getPages() {
    const pages = await this.pageModel
      .find({})
      .populate<{ domain: Domain }>('domain');

    return pages;
  }

  async sendMessage(message: unknown) {
    return this.kafkaProducer.send({
      topic: 'lh',
      messages: [
        {
          value: JSON.stringify({ msg: message }),
        },
      ],
    });
  }
}
