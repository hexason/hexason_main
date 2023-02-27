import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfigUpdateDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  config: string;
}

export class ConfigUpdateBankDTO {
  @ApiProperty()
  @IsString()
  'bank.name': string;

  @ApiProperty()
  @IsString()
  'bank.account': string;

  @ApiProperty()
  @IsString()
  'bank.reciver': string;
}

export class ConfigCreateDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  config: string;

  @ApiProperty()
  @IsString()
  type: string;
}
