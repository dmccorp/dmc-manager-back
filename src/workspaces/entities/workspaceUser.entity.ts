import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity()
export class WorkspaceUser {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiResponseProperty()
  @Column({ default: 'member' })
  role: string;

  @ApiResponseProperty()
  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @ApiResponseProperty()
  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  workspace: Workspace;
}
