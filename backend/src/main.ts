import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { config } from '@config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

const logger = new Logger('Main');

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  initializeValidationPipe(app);
  initializeSwagger(app);
  enableCors(app);

  useMorgan(app);
  useHelmet(app);
  useCookie(app);
  useCompression(app);

  await app.listen(config.port);
};

const initializeValidationPipe = (app: NestExpressApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
};

const initializeSwagger = (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Perfanalytics API')
    .setDescription('Lighthouse tests on cutting edge.')
    .setVersion(config.version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
  });
};

const useMorgan = (app: NestExpressApplication) => {
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
};

const enableCors = (app: NestExpressApplication) => {
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
};

const useHelmet = (app: NestExpressApplication) => {
  app.use(helmet());
};

const useCompression = (app: NestExpressApplication) => {
  app.use(compression());
};

const useCookie = (app: NestExpressApplication) => {
  app.use(cookieParser(config.secret));

  // app.use(cookieParser, {
  //   secret: config.secret,
  //   parseOptions: { httpOnly: true },
  // });
};

bootstrap().then(() => logger.log(`Server is running on port ${config.port}.`));
