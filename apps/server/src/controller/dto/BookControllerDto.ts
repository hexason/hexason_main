import { BookImage } from "@/models";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class BookAddDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  context: string;

  @ApiProperty()
  @IsString()
  coverImage: string;

  @ApiProperty()
  @IsArray()
  images: string[];
}