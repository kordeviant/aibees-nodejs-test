import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { DiscountModule } from './m-discount/discount.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:5657/'),
    DiscountModule,
  ],
  controllers: [],
  providers: [
    // fake auth guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // authorization guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
