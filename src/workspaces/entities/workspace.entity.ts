import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/boards/entities/board.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WorkspaceUser } from './workspaceUser.entity';

@Entity()
export class Workspace {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => [Board] })
  @OneToMany(() => Board, (board) => board.workspace, { cascade: true })
  boards: Board[];

  @ApiProperty({ type: () => [WorkspaceUser] })
  @OneToMany(() => WorkspaceUser, (user) => user.workspace, { cascade: true })
  users: WorkspaceUser[];
}
