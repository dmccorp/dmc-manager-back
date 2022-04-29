import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const workspace = await this.workspaceRepository.findOne(
      createBoardDto.workspaceId,
    );
    const board = await this.boardRepository.create(createBoardDto);
    board.workspace = workspace;
    return this.boardRepository.save(board);
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return this.boardRepository.findOne(id, { relations: ['workspace'] });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
