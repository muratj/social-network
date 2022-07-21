import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.userRegistration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Response({ passthrough: true }) res) {
    res.status(HttpStatus.OK);
    return this.authService.login(req.user);
  }
}
