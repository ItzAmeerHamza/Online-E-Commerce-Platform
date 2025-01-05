import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, UseGuards, Patch } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { CoreOutput } from 'src/common/dtos/output.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<CoreOutput> {
    return this.usersService.signup(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUser(@Req() { user: { id } }: RequestWithUser): Promise<UserOutputDto> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  updateUser(
    @Req() { user: { id } }: RequestWithUser,
    @Body() updateUserDto: UpdateUserInputDto,
  ): Promise<CoreOutput> {
    return this.usersService.updateProfile(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('address')
  addAddress(
    @Req() { user: { id } }: RequestWithUser,
    @Body() addressDto: CreateAddressInputDto,
  ): Promise<CoreOutput> {
    return this.usersService.addAddress(addressDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('address')
  readAddress(
    @Req() { user: { id } }: RequestWithUser,
  ): Promise<AddressOutputDto> {
    return this.usersService.readAddress(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address')
  updateAddress(
    @Req() { user: { id } }: RequestWithUser,
    @Body() updateAddressDto: UpdateAddressInputDto,
  ): Promise<CoreOutput> {
    return this.usersService.updateAddress(id, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('address')
  deleteAddress(@Req() { user: { id } }: RequestWithUser): Promise<CoreOutput> {
    return this.usersService.deleteAddress(id);
  }
  
}