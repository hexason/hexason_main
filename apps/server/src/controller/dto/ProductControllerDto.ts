import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductAddDTO {  
  @ApiProperty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsString()
  description?: string;
  
  @ApiProperty()
  @IsString()
  brand?: string;
  
  @ApiProperty()
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
  @IsIn(["active", "inactive", "draft"])
  status: string;

  @ApiProperty()
  @IsArray()
  images: string[];
}