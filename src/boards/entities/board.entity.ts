import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.boards)
  workspace: Workspace;

  @ManyToMany(() => User, (user) => user.boards)
  @JoinTable()
  users: User[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @OneToMany(() => Sprint, (sprint) => sprint.board)
  sprints: Sprint[];

  @OneToMany(() => State, (state) => state.board)
  states: State[];
}
