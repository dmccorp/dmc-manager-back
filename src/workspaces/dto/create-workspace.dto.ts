import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'IDs of users' })
  users: number[];
}
