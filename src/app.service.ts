import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const a = 1 + 2;
    return 'Hello World! 123123 do ngoc';
  }
}
