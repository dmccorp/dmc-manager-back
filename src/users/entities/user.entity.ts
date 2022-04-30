import { Board } from 'src/boards/entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  workspaces: Workspace[];

  @ManyToMany(() => Board, (board) => board.users)
  boards: Board[];

  @ManyToOne(() => Task, (task) => task.user)
  tasks: Task[];
}
