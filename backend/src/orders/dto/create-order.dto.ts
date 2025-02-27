// import { Type } from 'class-transformer';
import { IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  date?: string = new Date().toISOString();

  @IsArray()
  @ArrayNotEmpty({
    message: 'O pedido deve ter pelo menos um produto adicionado.',
  })
  productIds: string[];
}
