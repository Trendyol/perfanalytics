import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { KafkaProducerProvider } from './kafka-producer.provider';
import { LighthouseController } from './lighthouse.controller';
import { LighthouseService } from './lighthouse.service';

@Module({
  controllers: [LighthouseController],
  providers: [LighthouseService, KafkaProducerProvider],
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
