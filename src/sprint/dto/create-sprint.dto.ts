import { IsNotEmpty } from 'class-validator';

export class CreateSprintDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  board: number;
}
