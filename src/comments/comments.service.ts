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
    const task = await this.tasksRepository.findOne(createCommentDto.taskId, {
      relations: ['comments'],
    });
    if (!task) throw new NotFoundException('task not found');

    const comment = new Comment();
    comment.message = createCommentDto.message;
    const createdBy = await this.usersRepository.findOne(userId);
    comment.createdBy = createdBy;
    task.comments.push(comment);
    this.tasksRepository.save(task);

    return comment;
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new NotFoundException('comment not found');

    comment.message = updateCommentDto.message;
    comment.edited = true;
    return this.commentRepository.save(comment);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
