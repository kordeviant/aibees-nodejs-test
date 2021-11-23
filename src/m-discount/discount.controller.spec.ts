import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { startTestMango } from '../startup-config/startTestMango';
import { DiscountController } from './discount.controller';

describe('DiscountController', () => {
  let discountController: DiscountController;
  let mongod;
  let app: TestingModule;

  beforeAll(async () => {
    console.log('nnnnn');

    mongod = await startTestMango();
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    discountController = app.get<DiscountController>(DiscountController);
  });
  afterAll(async () => {
    await mongod.stop();
    await app.close();
  });

  beforeEach(async () => {
    console.log('asdasda222232323');
  });

  describe('root', () => {
    it('wrong product id should return "-1"', async () => {
      expect(await discountController.getDiscount('2')).toBe(-1);
    });
  });
});
