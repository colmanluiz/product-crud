import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../products/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  date: Date;

  @Prop()
  total: number; //this will only be saved after sum, how I do that?

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  productIds: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
