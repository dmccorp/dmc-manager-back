import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Workspace])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
