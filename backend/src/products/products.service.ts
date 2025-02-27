import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('categoryIds').exec();
  }

  async findOne(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug }).exec();

    if (!product) {
      throw new NotFoundException(`Produto com o ID: ${slug} não encontrado`);
    }

    return product;
  }

  async update(
    slug: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { slug },
      updateProductDto,
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Produto com o ID: ${slug} não encontrado`);
    }

    return updatedProduct;
  }

  async remove(slug: string): Promise<Product> {
    const deletedProduct = await this.productModel.findOneAndDelete({ slug });

    if (!deletedProduct) {
      throw new NotFoundException(`Produto com o ID: ${slug} não encontrado`);
    }

    return deletedProduct;
  }
}
