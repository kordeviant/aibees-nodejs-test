import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { seedTestDatawithApp } from './../src/seedTestDatawithApp';
import { startTestMango } from './../src/startTestMango';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongod;
  let products;

  beforeEach(async () => {
    mongod = await startTestMango();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    products = await seedTestDatawithApp(app);
  });

  it(`/discount/discount/:id (GET)`, () => {
    return request(app.getHttpServer())
      .get('/discount/discount/' + products[2].id)
      .expect(200)
      .expect('20');
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });
});
