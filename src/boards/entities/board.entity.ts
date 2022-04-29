import { Workspace } from 'src/workspaces/entities/workspace.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Workspace, (workspace) => workspace.boards)
  // @JoinColumn()
  workspace: Workspace;
}
