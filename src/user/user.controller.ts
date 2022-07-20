import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get('search')
  findByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
