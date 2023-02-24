import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, Max } from "class-validator";

export class AdminLoginDTO {
  @ApiProperty()
  @IsString()
  @Max(32)
  username: string;

  @ApiProperty()
  @IsString()
  @Max(32)
  password:string;
}

export class AdminAddDTO {
  @ApiProperty()
  @IsString()
  @Max(32)
  username: string;

  @ApiProperty()
  @IsString()
  @Max(32)
  password: string;

  @ApiProperty()
  @IsString()
  @Max(32)
  name: string;

  @ApiProperty({example: "super"})
  @IsString()
  @IsIn(["op", "super"])
  @Max(32)
  role: string;
}

export class AdminTokenRefreshDTO {
  @ApiProperty()
  @IsString()
  refresh_token: string
}