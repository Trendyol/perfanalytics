import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('lh')
  async respondToTestTopic(@Payload() message) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 3000);
    }).then((res) => {
      console.log(res);
    });

    await promise;
    console.log('promise ended', message.msg);
    return 'Hello World';
  }
}
