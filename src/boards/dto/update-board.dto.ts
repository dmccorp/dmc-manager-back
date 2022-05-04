import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { CreateStateDto } from './create-state.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateStateDto)
  @ValidateNested({ each: true })
  states: CreateStateDto[];
}
