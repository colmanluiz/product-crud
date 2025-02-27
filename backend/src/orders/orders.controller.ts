import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Order, OrderDocument } from './order.schema';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updatedOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove(id);
  }
}
