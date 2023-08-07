import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class GetCatsOkResponseDTO {
  @ApiProperty()
  idx: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  createdDate: Date;
}

export class AddCatBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kind: string;
}

export class UpdateCatQueryDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  idx: number;
}

export class UpdateCatBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kind: string;
}

export class DeleteCatQueryDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  idx: number;
}
