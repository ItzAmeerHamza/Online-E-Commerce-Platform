import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly jwtsecret;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signup(createuserdto: CreateUserDto): Promise<User>;
    login(loginuserdto: LoginDto): Promise<{
        user: User;
        accessToken: string;
    }>;
    validateToken(token: string): Promise<any>;
    findById(userId: string): Promise<User>;
    deleteUserById(userId: string): Promise<void>;
    findAll(): Promise<User[]>;
}
