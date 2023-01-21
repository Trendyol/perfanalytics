import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { KafkaProducerProvider } from './kafka-producer.provider';
import { LighthouseController } from './lighthouse.controller';
import { LighthouseService } from './lighthouse.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { LighthouseSchema } from './etc/lighthouse.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Lighthouse', schema: LighthouseSchema },
    ]),
  ],
  controllers: [LighthouseController],
  providers: [LighthouseService, KafkaProducerProvider],
  exports: [LighthouseService],
})
export class LighthouseModule implements OnModuleDestroy {
  constructor(
    @Inject('KafkaProducer')
    private readonly kafkaProducer: Producer,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.kafkaProducer.disconnect();
  }
}
