import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { State } from 'src/boards/entities/state.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';
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
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    private connection: Connection,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const task = new Task();
    task.name = createTaskDto.name;
    const state = await this.stateRepository.findOne(createTaskDto.stateId);
    task.state = state;
    const board = await this.boardsRepository.findOne(createTaskDto.board, {
      relations: ['users', 'users.user'],
    });
    if (
      !board ||
      !board.users.some((boardUser) => boardUser.user.id === userId)
    )
      throw new NotFoundException('board not found');
    task.board = board;
    if (createTaskDto.sprint) {
      const sprint = await this.sprintRepository.findOne(createTaskDto.sprint);
      if (!sprint) throw new BadRequestException('sprint not found');
      task.sprint = sprint;
    }
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

  async getTasksFromBoard(id, sprint): Promise<Task[]> {
    const board = await this.boardsRepository.findOne(id, {
      relations: [
        'tasks',
        'tasks.assignee',
        'tasks.createdBy',
        'tasks.comments',
        'tasks.state',
        'tasks.sprint',
      ],
    });
    if (!board) throw new NotFoundException();
    // TODO: optimize
    if (sprint) {
      return board.tasks.filter((task) => task.sprint?.id === sprint);
    }
    return board.tasks;
  }

  findOne(id: number) {
    return this.tasksRepository.findOne(id, {
      relations: ['comments'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { board, assignee, stateId, ...dto } = updateTaskDto;
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
    if (stateId) {
      const state = await this.stateRepository.findOne(stateId);
      task.state = state;
    }
    return this.connection.manager.save(task);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
