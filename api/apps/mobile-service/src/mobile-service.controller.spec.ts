import { Test, TestingModule } from '@nestjs/testing';
import { MobileServiceController } from './mobile-service.controller';
import { MobileServiceService } from './mobile-service.service';

describe('MobileServiceController', () => {
  let mobileServiceController: MobileServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MobileServiceController],
      providers: [MobileServiceService],
    }).compile();

    mobileServiceController = app.get<MobileServiceController>(MobileServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mobileServiceController.getHello()).toBe('Hello World!');
    });
  });
});
