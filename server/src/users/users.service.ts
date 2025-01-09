// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { UserOutputDto } from './dtos/user.dto';
// import { UpdateUserInputDto } from './dtos/edit-user.dto';
// import { hashPassword } from '../utils/hash-password';
// import { CoreOutput } from 'src/common/dtos/output.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly users: Repository<User>,

//   ) {}
//   async signup({
//     email,
//     password,
//     firstName,
//     lastName,
//     phone = '',
//     address = '',
//     age = 0,
//   }: CreateUserDto): Promise<CoreOutput> {
//     try {
//       const exists = await this.users.findOne({ where: { email } }); // unique constraint on email

//       if (exists) {
//         return { success: false, error: 'User already exists' };
//       }

//       password = await hashPassword(password);

//       const user = this.users.create({
//         email,
//         password,
//         firstName,
//         lastName,
//         phone,
//         address,
//         age,
//       });
//       await this.users.save(user);

//       return { success: true };
//     } catch (error) {
//       return { success: false, error: "Couldn't create account" };
//     }
//   }

//   async findById(id: number): Promise<UserOutputDto> {
//     try {
//       const user = await this.users.findOneOrFail({ where: { id } });
//       return { success: true, user };
//     } catch (error) {
//       return { success: false, error: "Couldn't find user" };
//     }
//   }

//   async findByEmail(email: string): Promise<UserOutputDto> {
//     try {
//       const user = await this.users.findOneOrFail({ where: { email } });
//       return { success: true, user };
//     } catch (error) {
//       return { success: false, error: "Couldn't find user" };
//     }
//   }

//   async updateProfile(
//     userId: number,
//     updateUserDto: UpdateUserInputDto,
//   ): Promise<CoreOutput> {
//     try {
//       const user = await this.users.findOneOrFail({ where: { id: userId } });
//       if (updateUserDto.password) {
//         updateUserDto.password = await hashPassword(updateUserDto.password);
//       }

//       Object.assign(user, updateUserDto);
//       await this.users.save(user);

//       return { success: true };
//     } catch (error) {
//       return { success: false, error: "Couldn't find user" };
//     }
//   }
// }


import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly jwtsecret = 'JWTSECRET';
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService) { }

  async signup(createuserdto: CreateUserDto): Promise<User> {
    const { email, password, phone, address, firstName, lastName, age } = createuserdto
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      phone,
      address,
      firstName,
      lastName,
      age
    });
    return this.userRepository.save(newUser);
  }

  async login(loginuserdto: LoginDto) {
    const { email, password} = loginuserdto;
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, userid : user.userId }; // unique email constraint
    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtsecret);
      return decoded; 
    } catch (err) {
      return null; 
    }
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: {userId} });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId}} not found`);
    }
    return user;
  }

  async deleteUserById(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

}
