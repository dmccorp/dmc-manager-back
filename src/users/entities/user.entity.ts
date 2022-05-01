import { Exclude, instanceToPlain } from 'class-transformer';
import { Board } from 'src/boards/entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WorkspaceUser } from 'src/workspaces/entities/workspaceUser.entity';

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

  @OneToMany(() => WorkspaceUser, (workspace) => workspace.user)
  workspaces: WorkspaceUser[];

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
