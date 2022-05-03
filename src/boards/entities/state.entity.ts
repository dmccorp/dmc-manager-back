import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class State {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty({ type: () => Board })
  @ManyToOne(() => Board, (board) => board.states)
  board: Board;

  @ApiProperty()
  @Column({ nullable: true })
  meta: string;
}
