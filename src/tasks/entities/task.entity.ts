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
import { State } from 'src/boards/entities/state.entity';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @ManyToOne(() => State, (state) => state.tasks, { nullable: true })
  state: State;

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
  @Column({ nullable: true })
  dueDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  priority: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
