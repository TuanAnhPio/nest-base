import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { User } from '../user/entities/user.entities';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { SkipAuth } from './decorators/skip-auth.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @SkipAuth()
  signIn(@Body() signInDto: SignInDto): any {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @SkipAuth()
  @ApiResponse({
    description: 'sign up api',
    type: User,
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('get user profile')
  getProfile(@Request() req): Promise<User> {
    return this.authService.getProfile(req.user.sub);
  }
}
