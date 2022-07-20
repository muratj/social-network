import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user: User = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
    // return await this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
