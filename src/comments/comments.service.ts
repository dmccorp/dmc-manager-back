import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const task = await this.tasksRepository.findOne(createCommentDto.taskId);
    if (!task) throw new NotFoundException('task not found');

    const comment = new Comment();
    comment.message = createCommentDto.message;
    comment.task = task;
    const createdBy = await this.usersRepository.findOne(userId);
    comment.createdBy = createdBy;
    this.tasksRepository.save(task);

    return comment;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    const comment = this.commentRepository.findOne(id);
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new NotFoundException('comment not found');

    comment.message = updateCommentDto.message;
    return this.commentRepository.save(comment);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
