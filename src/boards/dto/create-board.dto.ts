import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  workspaceId: number;
}
