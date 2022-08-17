import { plainToClass } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { yellow } from '@nestjs/common/utils/cli-colors.util';

class Config {
  @IsString()
  MONGO_URL: string;
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
