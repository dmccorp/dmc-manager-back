import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class BoardUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: 'member' })
  role: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @ApiProperty({ type: () => Board })
  @ManyToOne(() => Board, (board) => board.users)
  board: Board;
}
