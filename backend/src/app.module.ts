import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
