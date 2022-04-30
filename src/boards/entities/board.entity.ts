import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.boards)
  workspace: Workspace;

  @ManyToMany(() => User, (user) => user.boards)
  users: User[];
}
