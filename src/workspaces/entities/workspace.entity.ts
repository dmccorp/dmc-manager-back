import { Board } from 'src/boards/entities/board.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Board, (board) => board.workspace)
  // @JoinColumn()
  boards: Board[];
}
