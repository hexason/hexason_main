import { ItemI, ProductI } from '@/lib/interfaces';
import { Item, Product } from '@/lib/schema';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

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
  category: any;

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
  // @IsIn([12, 0])
  @IsNumber()
  status: number;

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

export class ProductInfoUpdateDTO implements Partial<Product> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bgColor?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string

  @ApiProperty()
  @IsArray()
  @IsOptional()
  category?: string[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagesDto)
  @IsOptional()
  images?: { url: string; blurHash: string; }[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OptionDto)
  options?: OptionDto[]

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  status?: number;
}

export class OptionDto {
  @ApiProperty()
  @IsString()
  configName: string;

  @ApiProperty()
  @IsString()
  value: string;
}


export class ImagesDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  blurHash: string;
}

export class ProductItemUpdateDto implements Partial<ItemI> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  configName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  altTxt: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  upc: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;


  status: number;
  sku: string;
  product: any;
}