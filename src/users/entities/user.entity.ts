import { Exclude, instanceToPlain } from 'class-transformer';
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
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  workspaces: Workspace[];

  @ManyToMany(() => Board, (board) => board.users)
  boards: Board[];

  @ManyToOne(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @ManyToOne(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  toJSON() {
    return instanceToPlain(this);
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
