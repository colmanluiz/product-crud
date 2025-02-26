import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(slug: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ slug }).exec();

    if (!category) {
      throw new NotFoundException(
        `Categoria com o ID: "${slug}" não encontrada`,
      );
    }

    return category;
  }

  async update(
    slug: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { slug },
      updateCategoryDto,
    );

    if (!updatedCategory) {
      throw new NotFoundException(
        `Categoria com o ID: "${slug}" não encontrada`,
      );
    }

    return updatedCategory;
  }

  async remove(slug: string): Promise<Category> {
    const removedCategory = await this.categoryModel.findOneAndDelete({ slug });

    if (!removedCategory) {
      throw new NotFoundException(
        `Categoria com o ID: "${slug}" não encontrada`,
      );
    }

    return removedCategory;
  }
}
