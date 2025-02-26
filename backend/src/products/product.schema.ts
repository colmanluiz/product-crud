import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Query } from 'mongoose';
import { Category } from '../categories/category.schema';
import slugify from 'slugify';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: true })
  slug?: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
  })
  categoryIds: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

ProductSchema.pre(
  'findOneAndUpdate',
  function (this: Query<ProductDocument, ProductDocument>, next) {
    const update = this.getUpdate();

    if (update && typeof update === 'object' && 'name' in update) {
      this.set({ slug: slugify(update.name as string) });
    }

    next();
  },
);
