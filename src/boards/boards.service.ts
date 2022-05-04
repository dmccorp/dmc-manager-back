import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Connection, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardUser } from './entities/boardUser.entity';
import { State } from './entities/state.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(State) private stateRepository: Repository<State>,
    private connection: Connection,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId): Promise<Board> {
    const { users, ...dto } = createBoardDto;
    const workspace = await this.workspaceRepository.findOne(
      createBoardDto.workspaceId,
    );
    if (!workspace) throw new NotFoundException('workspace not found');
    const board = await this.boardRepository.create(dto);
    board.workspace = workspace;
    this.boardRepository.save(board);
    const foundUsers = await this.usersRepository.findByIds([...users, userId]);
    for (const user of foundUsers) {
      const boardUser = new BoardUser();
      boardUser.role = userId === user.id ? 'owner' : 'member';
      boardUser.user = user;
      boardUser.board = board;
      await this.connection.manager.save(boardUser);
    }
    return board;
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoards(id): Promise<BoardUser[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['boards', 'boards.users', 'boards.sprints', 'boards.states'],
    });
    return user.boards;
  }

  findOne(id: number) {
    return this.boardRepository.findOne(id, { relations: ['workspace'] });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne(id, {
      relations: ['users', 'users.user'],
    });
    board.name = updateBoardDto.name;
    if (updateBoardDto.users) {
      const userIds = updateBoardDto.users.map((user) => user.id);
      // TODO: check at least one owner
      const remainingUsers = board.users.filter((boardUser) =>
        userIds.includes(boardUser.user.id),
      );
      const remainingIds = remainingUsers.map((boardUser) => boardUser.user.id);
      const newUserIds = userIds.filter((id) => !remainingIds.includes(id));
      const newUsers = await this.usersRepository.findByIds(newUserIds);
      board.users = remainingUsers;
      // TODO: accept as set role
      for (const user of newUsers) {
        const boardUser = new BoardUser();
        boardUser.board = board;
        boardUser.user = user;
        this.connection.manager.save(boardUser);
      }
    }
    if (updateBoardDto.states) {
      const states = updateBoardDto.states.map((dto) => {
        const state = new State();
        state.name = dto.name;
        state.state = dto.state;
        return state;
      });
      board.states = states;
    }
    this.connection.manager.save(board);
    return board;
  }

  remove(id: number) {
    return this.boardRepository.delete(id);
  }

  async createState(id: number, createStateDto: CreateStateDto) {
    const state = await this.stateRepository.create(createStateDto);
    const foundBoard = await this.boardRepository.findOne(id);
    state.board = foundBoard;
    return this.stateRepository.save(state);
  }

  async clearStates(id: number) {
    const board = await this.boardRepository.findOne(id);
    board.states = [];
    await this.boardRepository.save(board);
    return board;
  }
}
