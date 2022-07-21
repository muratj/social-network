import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async userRegistration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const validPass = await bcrypt.compare(password, user.password);
    if (user && validPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return this.generateToken(user);
  }

  private async generateToken(user: any) {
    const payload = { username: user.email, id: user.id };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
