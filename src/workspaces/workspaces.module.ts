import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkspaceUser } from './entities/workspaceUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, WorkspaceUser])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  // exports: [TypeOrmModule],
})
export class WorkspacesModule {}
