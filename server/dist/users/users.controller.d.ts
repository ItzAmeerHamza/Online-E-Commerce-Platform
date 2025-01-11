import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    signup(createUserdto: CreateUserDto): Promise<User>;
    login(createUserdto: CreateUserDto): Promise<{
        user: User;
        accessToken: string;
    }>;
    findById(id: string): Promise<User>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<User[]>;
}
