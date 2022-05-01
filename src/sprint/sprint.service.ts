import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from './entities/sprint.entity';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async create(createSprintDto: CreateSprintDto) {
    const { board, ...dto } = createSprintDto;
    const sprint = await this.sprintRepository.create(dto);
    const foundBoard = await this.boardRepository.findOne(board);
    sprint.board = foundBoard;
    return this.sprintRepository.save(sprint);
  }

  findAll() {
    return `This action returns all sprint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sprint`;
  }

  update(id: number, updateSprintDto: UpdateSprintDto) {
    return `This action updates a #${id} sprint`;
  }

  remove(id: number) {
    return `This action removes a #${id} sprint`;
  }
}
