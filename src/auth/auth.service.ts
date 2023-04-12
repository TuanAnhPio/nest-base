import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entities';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { classToPlain, plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Email or password is incorrect.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is incorrect.');
    }

    const payload = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.userService.findOneByEmail(signUpDto.email);
    if (user) {
      throw new BadRequestException('Email already have an account.');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, saltOrRounds);
    const newUserData = {
      ...signUpDto,
      password: hashedPassword,
    };

    const newUser = await this.userService.createUser(newUserData);
    return plainToClass(User, newUser);
  }

  async getProfile(id) {
    const user = await this.userService.getUserById(id);
    return plainToClass(User, user);
  }
}
