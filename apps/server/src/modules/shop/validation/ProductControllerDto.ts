import { ItemI, ProductI } from 'pointes';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProductAddDTO implements Partial<ProductI> {
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
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  images: { url: string; blurHash: string }[];

  sold: number;
  quantity: number;
  supplier: string;
}

export class ProductInfoUpdateDTO implements Partial<ProductI> {
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
  image?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  category?: any[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagesDto)
  @IsOptional()
  images?: { url: string; blurHash: string }[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OptionDto)
  options?: OptionDto[];

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
  _id: string;

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
