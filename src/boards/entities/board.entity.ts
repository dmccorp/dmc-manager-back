import { ApiProperty } from '@nestjs/swagger';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardUser } from './boardUser.entity';
import { State } from './state.entity';

@Entity()
export class Board {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => Workspace })
  @ManyToOne(() => Workspace, (workspace) => workspace.boards)
  workspace: Workspace;

  @ApiProperty({ type: () => [BoardUser] })
  @OneToMany(() => BoardUser, (user) => user.board, { cascade: true })
  users: BoardUser[];

  @ApiProperty({ type: () => [Task] })
  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  tasks: Task[];

  @ApiProperty({ type: () => [Sprint] })
  @OneToMany(() => Sprint, (sprint) => sprint.board, { cascade: true })
  sprints: Sprint[];

  @ApiProperty({ type: () => [State] })
  @OneToMany(() => State, (state) => state.board, { cascade: true })
  states: State[];
}
