import config from '@core/config';
import { IStorageService } from '@core/data/services/storage.service';
import { OnModuleInit } from '@nestjs/common';
import * as cdn from '@trendyol-js/cdn';
import { writeFileSync, unlinkSync, mkdirSync } from 'fs';
import * as path from 'path';

export class CdnStorageService implements IStorageService, OnModuleInit {
  private readonly reportsPath = path.join(__dirname, '../../../../reports');

  onModuleInit() {
    const { secret } = config.storage.cdn;
    cdn.authorize(secret);

    mkdirSync(this.reportsPath, { recursive: true });
  }

  async upload(file: string, id: string): Promise<string> {
    const { environment, team } = config.storage.cdn;

    const sourcePath = `${this.reportsPath}/${id}.html`;
    writeFileSync(sourcePath, file);

    const item = cdn.item({ sourcePath, environment, team });
    await cdn.upload(item);

    unlinkSync(sourcePath);
    const url = this.generateUrl(id, team, environment);

    return url;
  }

  generateUrl(id: string, team: string, environment: string) {
    const { basePath } = config.storage.cdn;
    return `${basePath}/${team}/${environment}/${id}.html`;
  }
}
