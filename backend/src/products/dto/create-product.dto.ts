import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsNotEmpty({ message: 'O produto deve ter pelo menos uma categoria.' })
  categoryIds: string[];
}
