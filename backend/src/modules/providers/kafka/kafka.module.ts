import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PERFANALYTICS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'perfanalytics',
            brokers: ['localhost:9090'],
          },
          consumer: {
            groupId: 'perfanalytics-consumer',
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
