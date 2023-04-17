import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllUser(): any {
    return this.userService.findAll();
  }
}
