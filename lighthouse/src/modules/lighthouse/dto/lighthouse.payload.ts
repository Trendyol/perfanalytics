import { IsMongoId, IsString } from 'class-validator';
import { Device } from '../enums';

export class LighthousePayload {
  readonly message: LighthouseMessage;
}

export class LighthouseMessage {
  @IsString()
  readonly url: string;

  @IsMongoId()
  readonly owner: LighthouseMessage;

  @IsMongoId()
  readonly domainId: LighthouseMessage;

  @IsMongoId()
  readonly pageId: LighthouseMessage;

  @IsString()
  readonly device: Device;
}
