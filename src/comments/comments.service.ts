import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Connection, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const task = await this.tasksRepository.findOne(createCommentDto.taskId);
    if ( !task )
      throw new NotFoundException('task not found');

    const comment = new Comment();
    comment.commentText = createCommentDto.comment;
    comment.task = task
    const createdBy = await this.usersRepository.findOne(userId);
    comment.createdBy = createdBy;
    this.tasksRepository.save(task);
    task.comments.push(comment)

    return comment
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    const comment = this.commentRepository.findOne(id)
    return comment
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
