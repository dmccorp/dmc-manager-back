import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  // exports: [TypeOrmModule],
})
export class WorkspacesModule {}
