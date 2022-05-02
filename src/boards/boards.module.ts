import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/entities/task.entity';
import { State } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Workspace, User, Task, State])],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
})
export class BoardsModule {}
