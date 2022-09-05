import { Page } from '@modules/page/etc/page.schema';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Producer } from 'kafkajs';
import { Model, PaginateModel } from 'mongoose';
import { Domain } from '@modules/domain/etc/domain.schema';
import { Lighthouse } from './etc/lighthouse.schema';
import { User } from '@modules/user/etc/user.schema';
@Injectable()
export class LighthouseService {
  constructor(
    @Inject('KafkaProducer') private readonly kafkaProducer: Producer,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
    @InjectModel('Lighthouse')
    private readonly lighthouseModel: PaginateModel<Lighthouse>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const pages = await this.getPages();
    pages.forEach((page) => {
      const lighthousePayload = {
        url: page.domain?.url + page?.url,
        owner: page.owner,
        domainId: page.domain._id,
        pageId: page._id,
        device: page.device,
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
          value: JSON.stringify({ message }),
        },
      ],
    });
  }

  async get(user: User, startDate: string, endDate: string): Promise<any> {
    const query = {
      owner: user,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    return this.lighthouseModel.find(query);
  }
}
