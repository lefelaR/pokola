import { Controller, Get } from '@nestjs/common';
import { MobileServiceService } from './mobile-service.service';

@Controller()
export class MobileServiceController {
  constructor(private readonly mobileServiceService: MobileServiceService) {}

  @Get()
  getHello(): string {
    return this.mobileServiceService.getHello();
  }
}
