import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { State } from 'src/boards/entities/state.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board, User, State, Sprint])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
