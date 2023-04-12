import { ProductI } from '@/lib/interfaces';
import { Item } from '@/lib/schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductAddDTO implements ProductI {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  bgColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty()
  @IsIn(['active', 'inactive', 'draft'])
  status: string;

  @ApiProperty()
  @IsArray()
  options: { configName: string; value: string; }[];

  @ApiProperty()
  @IsArray()
  images: { url: string; blurHash: string; }[];
  
  @ApiProperty()
  @IsArray()
  items: Item[];

  sold: number;
  quantity: number;
  supplier: string;
}
