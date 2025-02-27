import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'O produto deve ter pelo menos uma categoria.' })
  categoryIds: string[];
}
