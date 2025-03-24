import { IsDate, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsDate()
  date: Date;

  @IsNumber()
  orderCount: number;

  @IsNumber()
  totalSales: number;

  @IsNumber()
  averageOrderValue: number;
}
