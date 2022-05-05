import { ApiProperty } from '@nestjs/swagger';

export class ListTaskDto {
  @ApiProperty()
  sprint: number;
}
