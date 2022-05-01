import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
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
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const { users, ...dto } = createBoardDto;
    const workspace = await this.workspaceRepository.findOne(
      createBoardDto.workspaceId,
    );
    if (!workspace) throw new NotFoundException('workspace not found');
    const board = await this.boardRepository.create(dto);
    board.workspace = workspace;
    const foundUsers = await this.usersRepository.findByIds(users);
    board.users = foundUsers;
    return this.boardRepository.save(board);
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoards(id): Promise<Board[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['boards', 'boards.users', 'boards.sprints'],
    });
    return user.boards;
  }

  findOne(id: number) {
    return this.boardRepository.findOne(id, { relations: ['workspace'] });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return this.boardRepository.delete(id);
  }
}
