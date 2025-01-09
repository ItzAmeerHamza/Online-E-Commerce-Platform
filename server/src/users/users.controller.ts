// import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UseGuards, Patch } from '@nestjs/common';
// import { Request } from 'express';
// import { UserService } from './users.service';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { LoginDto } from './dtos/login-user.dto';
// import { User } from './interfaces/user.interface';
// import { CoreOutput } from 'src/common/dtos/output.dto';
// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// class JwtAuthGuard extends AuthGuard('jwt') {}

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UserService) {}

//   @Post('signup')
//   async signup(@Body() createUserDto: CreateUserDto): Promise<CoreOutput> {
//     return this.usersService.signup(createUserDto);
//   }

//   @Post('signin')
//   async signin(@Body() userDTO: LoginDto): Promise<CoreOutput> {
//     const user = await this.usersService.findByLogin(userDTO);
//       const payload = {
//           email: user.email,
//       }
//       const token = await this.authService.signPayload(payload);
//       return {
//           user,token
//       }
//   }

//   // @Post('login')
//   // async login(@Body() userDTO: LoginDTO){
//   //     const user = await this.userService.findByLogin(userDTO);
//   //     const payload = {
//   //         email: user.email,
//   //     }
//   //     const token = await this.authService.signPayload(payload);
//   //     return {
//   //         user,token
//   //     }
//   // }

//   // @Post('register')
//   // async register(@Body() userDTO: RegisterDTO){
//   //     const user = await this.userService.create(userDTO);
//   //     const payload = {
//   //         email: user.email,
//   //     }
//   //     const token = await this.authService.signPayload(payload);
//   //     return {user,token}
//   // }
// }


import { Controller, Post, Body, BadRequestException, Param, Get, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async signup(@Body()  createUserdto: CreateUserDto) {
    return this.usersService.signup(createUserdto);
  }

  @Post('login')
  async login(@Body() createUserdto: CreateUserDto) {
    const user = await this.usersService.login(createUserdto);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return user
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    await this.usersService.deleteUserById(userId);
    return { message: `User with ID ${userId} has been deleted.` };
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll(); 
  }
}
