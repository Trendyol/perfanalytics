import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9090'],
        },
        consumer: {
          groupId: 'perfanalytics-consumer',
          sessionTimeout: 90000,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
