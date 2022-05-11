import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async search(searchTerm: string) {
    const result = await this.connection.manager.getRepository(User).find({
        username: Like(`%${searchTerm}%`),
    })

    return result
  }

  // findByUsername(username: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ username });
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    user.username = updateUserDto.username;
    this.connection.manager.save(user);
    return user
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
