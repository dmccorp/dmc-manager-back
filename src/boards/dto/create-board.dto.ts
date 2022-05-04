import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class UserEntry {
  id: number;
  role: string;
}

export class CreateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  workspaceId: number;

  @ApiProperty()
  @IsNotEmpty()
  users: UserEntry[];
}
