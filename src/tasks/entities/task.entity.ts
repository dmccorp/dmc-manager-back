import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/boards/entities/board.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => Board })
  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignee: User;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy: User;

  @ApiProperty({ type: () => Sprint })
  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint: Sprint;

  @ApiProperty({ type: () => Comment })
  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments: Comment[];

  @ApiProperty()
  @Column()
  dueDate: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
