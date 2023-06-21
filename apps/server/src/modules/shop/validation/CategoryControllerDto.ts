import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parent: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug: string;
}
