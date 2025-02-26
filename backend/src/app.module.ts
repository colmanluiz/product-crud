import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
