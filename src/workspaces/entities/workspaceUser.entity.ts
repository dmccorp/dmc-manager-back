import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity()
export class WorkspaceUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: 'member' })
  role: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @ApiProperty()
  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  workspace: Workspace;
}
