import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  orderCount: number;

  @Prop({ required: true })
  totalSales: number;

  @Prop()
  averageOrderValue: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
