import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateStateDto } from './create-state.dto';

export class CreateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  workspaceId: number;

  @ApiProperty()
  @IsNotEmpty()
  users: number[];

  @ApiProperty()
  @IsNotEmpty()
  states: CreateStateDto[];
}
