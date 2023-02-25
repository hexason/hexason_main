import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, Max, MaxLength } from 'class-validator';

export class AdminLoginDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  password: string;
}

export class AdminAddDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  name: string;

  @ApiProperty({ example: 'super' })
  @IsString()
  @IsIn(['op', 'super'])
  @MaxLength(32)
  role: string;
}

export class AdminTokenRefreshDTO {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
