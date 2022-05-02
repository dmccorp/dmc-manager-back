import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  internalState: string;

  @ManyToOne(() => Board, (board) => board.states)
  board: Board;

  @Column({ nullable: true })
  meta: string;
}
