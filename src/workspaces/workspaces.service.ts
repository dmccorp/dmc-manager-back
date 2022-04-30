import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const { users, ...dto } = createWorkspaceDto;
    const workspace = await this.workspacesRepository.create(dto);
    const foundUsers = await this.usersRepository.findByIds(users);
    workspace.users = foundUsers;
    return this.workspacesRepository.save(workspace);
  }

  findAll(): Promise<Workspace[]> {
    return this.workspacesRepository.find();
  }

  async getWorkspaces(id): Promise<Workspace[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['workspaces', 'workspaces.users', 'workspaces.boards'],
    });
    return user.workspaces;
  }

  findOne(id: number) {
    return this.workspacesRepository.findOne(id, { relations: ['boards'] });
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.workspacesRepository.findOne(id);
    const users = await this.usersRepository.findByIds(
      updateWorkspaceDto.users,
    );
    workspace.users = users;
    this.connection.manager.save(workspace);
    return workspace;
  }

  remove(id: number) {
    return this.workspacesRepository.delete(id);
  }
}
