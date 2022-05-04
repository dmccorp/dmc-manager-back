import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ username });
    if (user && (await user.validatePassword(pass))) {
      return user;
    }
    return null;
  }

  async signup(user: CreateUserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOne({
      username: user.username,
    });
    if (foundUser) throw new ConflictException(null, 'user already exists');
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.usersRepository.save(user);
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      jwt: this.jwtService.sign(payload),
      user,
    };
  }
}
