import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Board, (board) => board.workspace)
  boards: Board[];

  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable()
  users: User[];
}
