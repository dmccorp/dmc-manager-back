import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateStateDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  internalState: string;
}
