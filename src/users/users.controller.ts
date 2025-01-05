import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UseGuards, Patch } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<CoreOutput> {
    return this.usersService.signup(createUserDto);
  }
  
}