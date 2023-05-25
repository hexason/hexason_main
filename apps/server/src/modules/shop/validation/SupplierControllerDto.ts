import { ApiProperty } from "@nestjs/swagger";
import {  IsOptional, IsString } from "class-validator";
import { SupplierI } from "pointes";

export class CreateSupplierDto implements Partial<SupplierI>{
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    location?: string;
}

export class UpdateSupplierDto implements Partial<SupplierI>{
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    location?: string;
}

