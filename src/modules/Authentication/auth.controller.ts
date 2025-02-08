import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from 'src/dto/users/signUpUser.dto';
import { SignInUserDto } from 'src/dto/users/signInUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(200)
  async signUp(@Body() registerCreds: SignUpUserDto) {
    return await this.authService.signUp(registerCreds);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() loginCreds: SignInUserDto) {
    return await this.authService.signIn(loginCreds);
  }
}
