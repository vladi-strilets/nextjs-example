/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post } from '@nestjs/common';
import { D_CreateUserRequestDto } from '../requests/create-user.request.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async d_createUser(@Body() dto: D_CreateUserRequestDto) {
    await this.usersService.d_createUser(dto);
  }
}
