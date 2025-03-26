import { IsISO8601, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsISO8601()
  date: string;

  @IsNumber()
  orderCount: number;

  @IsNumber()
  totalSales: number;

  @IsNumber()
  averageOrderValue: number;
}
