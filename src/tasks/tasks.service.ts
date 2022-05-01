import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const task = new Task();
    task.name = createTaskDto.name;
    const board = await this.boardsRepository.findOne(createTaskDto.board, {
      relations: ['users'],
    });
    if (!board || !board.users.some((user) => user.id === userId))
      throw new NotFoundException('board not found');
    task.board = board;
    if (createTaskDto.assignee) {
      const assignee = await this.usersRepository.findOne(
        createTaskDto.assignee,
      );
      task.assignee = assignee;
    }
    const createdBy = await this.usersRepository.findOne(userId);
    task.createdBy = createdBy;
    return this.tasksRepository.save(task);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  async getTasksFromBoard(id): Promise<Task[]> {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['tasks', 'tasks.assignee', 'tasks.createdBy'],
    });
    if (!board) throw new NotFoundException();
    return board.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { board, assignee, ...dto } = updateTaskDto;
    // FIXME
    // this.tasksRepository.update(id, dto);
    const task = await this.tasksRepository.findOne(id, {
      relations: ['createdBy'],
    });
    if (!task) throw new NotFoundException();
    for (const key in dto) {
      task[key] = dto[key];
    }
    if (board) {
      const foundBoard = await this.boardsRepository.findOne(board);
      if (!foundBoard) throw new NotFoundException('board not found');
      task.board = foundBoard;
    }
    if (assignee) {
      const foundAssignee = await this.usersRepository.findOne(assignee);
      if (!foundAssignee) throw new NotFoundException('assignee not found');
      task.assignee = foundAssignee;
    }
    return this.connection.manager.save(task);
    // return this.tasksRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
