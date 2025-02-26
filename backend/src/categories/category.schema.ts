import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query } from 'mongoose';
import slugify from 'slugify';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ unique: true, index: true })
  slug?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

CategorySchema.pre(
  'findOneAndUpdate',
  function (this: Query<CategoryDocument, CategoryDocument>, next) {
    const update = this.getUpdate();

    if (update && typeof update === 'object' && 'name' in update) {
      this.set({ slug: slugify(update.name as string) });
    }

    next();
  },
);
