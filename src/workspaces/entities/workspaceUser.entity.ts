import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity()
export class WorkspaceUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'member' })
  role: string;

  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  workspace: Workspace;
}
