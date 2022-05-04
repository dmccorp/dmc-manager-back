import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { CreateStateDto } from './create-state.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty()
  @IsNotEmpty()
  states: CreateStateDto[];
}
