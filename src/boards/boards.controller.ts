import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ListTaskDto } from 'src/tasks/dto/list-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardUser } from './entities/boardUser.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(createBoardDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({
    type: [BoardUser],
  })
  findAll(@Request() req) {
    // return this.boardsService.findAll();
    return this.boardsService.getBoards(req.user.id);
  }

  @Get(':id/tasks')
  findTasksFromBoard(@Param('id') id: string, @Query() query: ListTaskDto) {
    return this.tasksService.getTasksFromBoard(+id, +query.sprint);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }

  @Post(':id/states')
  createState(@Body() createStateDto: CreateStateDto, @Param('id') id: string) {
    return this.boardsService.createState(+id, createStateDto);
  }

  @Delete(':id/states')
  removeStatus(@Param('id') id: string) {
    return this.boardsService.clearStates(+id);
  }
}
