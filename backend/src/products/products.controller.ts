import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findOne(slug);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updatedProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(slug, updatedProductDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.remove(slug);
  }
}
