import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException(`Pedido com o ID: "${id}" não encontrado`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updateOrderDto,
    );

    if (!updatedOrder) {
      throw new NotFoundException(`Pedido com o ID: "${id}" não encontrado`);
    }

    return updatedOrder;
  }

  async remove(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      throw new NotFoundException(`Pedido com o ID: "${id}" não encontrado`);
    }

    return deletedOrder;
  }
}
