import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  initializeValidationPipe(app);
  initializeSwagger(app);
  initializeMorgan(app);
  enableCors(app);

  await registerHelmet(app);

  await app.listen(4000);
}

function initializeValidationPipe(app: NestFastifyApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
}

function initializeSwagger(app: NestFastifyApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Perfanalytics API')
    .setDescription('Lighthouse tests on cutting edge.')
    .setVersion('0.5.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
  });
}

function initializeMorgan(app: NestFastifyApplication) {
  const logger = new Logger('Morgan');
  app.use(
    morgan(':remote-addr :url :method :req[origin] :status :response-time ms', {
      stream: {
        write: (message: string) => {
          logger.log(message.replace('\n', ''));
          return true;
        },
      },
    }),
  );
}

function enableCors(app: NestFastifyApplication) {
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}

async function registerHelmet(app: NestFastifyApplication) {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
}

bootstrap().then(() => logger.log(`Server is running on port 4000.`));
