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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: 'created' })
  state: string;

  @ManyToOne(() => Board, (board) => board.sprints)
  board: Board;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
