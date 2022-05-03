import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/boards/entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sprint {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  startDate: Date;

  @ApiProperty()
  @Column()
  endDate: Date;

  @ApiProperty()
  @Column({ default: 'created' })
  state: string;

  @ApiProperty({ type: () => Board })
  @ManyToOne(() => Board, (board) => board.sprints)
  board: Board;

  @ApiProperty({ type: () => [Task] })
  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
