import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { yellow } from '@nestjs/common/utils/cli-colors.util';

class Config {
  @IsString()
  ORIGIN: string;

  @IsNumber()
  PORT: number;

  @IsString()
  VERSION: string;

  @IsString()
  MONGO_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Config, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    validationError: {
      target: false,
    },
  });

  if (errors.length > 0) {
    const parsedErrors = errors
      .map((error) => `${Object.values(error.constraints)[0]}!`)
      .join('\n');

    console.log(yellow(parsedErrors));
    process.exit(1);
  }
  return validatedConfig;
}
