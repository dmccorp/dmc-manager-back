import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Sprint } from './entities/sprint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint, Board])],
  controllers: [SprintController],
  providers: [SprintService],
})
export class SprintModule {}
