import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('PERFANALYTICS_SERVICE') private readonly runnerClient: ClientKafka,
  ) {}

  emit(event: string, data: any) {
    this.runnerClient.emit(event, data);
  }
}
