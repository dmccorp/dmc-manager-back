import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';
import { WorkspaceUser } from './entities/workspaceUser.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: number,
  ): Promise<Workspace> {
    const { users, ...dto } = createWorkspaceDto;
    const workspace = await this.workspacesRepository.create(dto);
    // const workspaceUsers = [];
    // workspace.users = workspaceUsers;
    this.workspacesRepository.save(workspace);
    const foundUsers = await this.usersRepository.findByIds([...users, userId]);
    for (const user of foundUsers) {
      const workspaceUser = new WorkspaceUser();
      workspaceUser.role = userId === user.id ? 'owner' : 'member';
      workspaceUser.user = user;
      workspaceUser.workspace = workspace;
      await this.connection.manager.save(workspaceUser);
      // workspaceUsers.push(workspaceUser);
    }
    return workspace;
  }

  findAll(): Promise<Workspace[]> {
    return this.workspacesRepository.find();
  }

  async getWorkspaces(id): Promise<WorkspaceUser[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: [
        'workspaces',
        'workspaces.workspace',
        'workspaces.workspace.boards',
        'workspaces.workspace.boards.sprints',
        'workspaces.workspace.boards.states',
        // 'workspaces.user',
      ],
    });
    return user.workspaces;
  }

  findOne(id: number) {
    return this.workspacesRepository.findOne(id, { relations: ['boards'] });
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.workspacesRepository.findOne(id, {
      relations: ['users.user'],
    });
    workspace.name = updateWorkspaceDto.name;
    this.connection.manager.save(workspace);
    if (updateWorkspaceDto.users) {
      const userIds = updateWorkspaceDto.users;
      // TODO: check at least one owner
      const remainingUsers = workspace.users.filter((workspaceUser) =>
        userIds.includes(workspaceUser.user.id),
      );
      const remainingIds = remainingUsers.map(
        (workspaceUser) => workspaceUser.user.id,
      );
      const newUserIds = userIds.filter((id) => !remainingIds.includes(id));
      const newUsers = await this.usersRepository.findByIds(newUserIds);
      workspace.users = remainingUsers;
      this.connection.manager.save(workspace);
      // TODO: accept as set role
      for (const user of newUsers) {
        const workspaceUser = new WorkspaceUser();
        workspaceUser.workspace = workspace;
        workspaceUser.user = user;
        this.connection.manager.save(workspaceUser);
      }
    }
    return workspace;
  }

  remove(id: number) {
    return this.workspacesRepository.delete(id);
  }
}
