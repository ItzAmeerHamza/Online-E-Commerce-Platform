import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;
  
  @IsNotEmpty()
  lastName: string;

  age?: number;

  phone?: string;

  address?: string;

  @IsNotEmpty()
  password: string;

  isAdmin: boolean;
}