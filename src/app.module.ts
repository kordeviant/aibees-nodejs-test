import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountModule } from './m-discount/discount.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:5657/'),
    DiscountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
