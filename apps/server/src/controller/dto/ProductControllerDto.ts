import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductAddDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand?: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemType?: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  oldPrice?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sold?: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsIn(['active', 'inactive', 'draft'])
  status: string;

  @ApiProperty()
  @IsArray()
  images: string[];
}
