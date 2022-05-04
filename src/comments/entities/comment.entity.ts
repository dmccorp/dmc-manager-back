import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.createdComments)
  createdBy: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: () => [Task] })
  @ManyToOne(() => Task, (task) => task.comments, { cascade: true })
  task: Task;

  @ApiProperty()
  @Column({ default: false })
  edited: boolean;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
