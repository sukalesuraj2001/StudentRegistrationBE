import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from appService !';
  }

  getAllData(){
    return "this is the all data api "
  }
}
