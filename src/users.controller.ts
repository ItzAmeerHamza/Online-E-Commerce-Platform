import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, ListAllEntities } from './dto';

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    @Get()
    findAll(@Query() query: ListAllEntities) {
        return 'This action returns all cats';
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return `This action returns a #${params.id} user`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id} user`;
    }
  
}