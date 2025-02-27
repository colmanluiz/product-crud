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

// OrderSchema.pre('save', async function (next) {
//   const order = this as OrderDocument;

//   try {
//     // Acesse o modelo Product de forma correta
//     const ProductModel = mongoose.model<Product>('Product');

//     // Busca os produtos vinculados ao pedido
//     const products = await ProductModel.find({
//       _id: { $in: order.productIds },
//     });

//     // Calcula o total
//     order.total = products.reduce((sum, product) => sum + product.price, 0);

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
