import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
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

  @Get('google')
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  googleAuthRedirect(@Req() req) {
    return {
      message: 'Login exitoso con Google',
      user: req.user, // <-- Asegúrate de manejar la información del usuario aquí
    };
  }
}
