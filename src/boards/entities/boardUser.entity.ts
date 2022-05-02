import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class BoardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'member' })
  role: string;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @ManyToOne(() => Board, (board) => board.users)
  board: Board;
}
