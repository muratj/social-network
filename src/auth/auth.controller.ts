import { Body, Controller, Post, Response, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.userRegistration(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Response({ passthrough: true }) res) {
    res.status(HttpStatus.OK);
    return this.authService.login(loginDto);
  }
}
