import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Shoulders say: Hello World!',
      apiDoc: 'http://localhost:3000/api',
    };
  }
}
