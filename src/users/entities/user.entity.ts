import { Exclude, instanceToPlain } from 'class-transformer';
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
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BoardUser } from 'src/boards/entities/boardUser.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  // @ApiProperty()
  // @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => WorkspaceUser, (workspace) => workspace.user)
  workspaces: WorkspaceUser[];

  @OneToMany(() => BoardUser, (board) => board.user)
  boards: BoardUser[];

  @ManyToOne(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @ManyToOne(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @ManyToMany(() => Comment, (comment) => comment.createdBy)
  createdComments: Comment[];

  toJSON() {
    return instanceToPlain(this);
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
