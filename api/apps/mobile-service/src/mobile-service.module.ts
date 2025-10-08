import { Module } from '@nestjs/common';
import { MobileServiceController } from './mobile-service.controller';
import { MobileServiceService } from './mobile-service.service';

@Module({
  imports: [],
  controllers: [MobileServiceController],
  providers: [MobileServiceService],
})
export class MobileServiceModule {}
