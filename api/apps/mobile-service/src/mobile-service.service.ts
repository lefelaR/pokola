import { Injectable } from '@nestjs/common';

@Injectable()
export class MobileServiceService {
  getHello(): string {
    return 'Hello mobile service!';
  }
}
