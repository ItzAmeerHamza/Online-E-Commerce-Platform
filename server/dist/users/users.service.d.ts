import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserOutputDto } from './dtos/user.dto';
import { UpdateUserInputDto } from './dtos/edit-user.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class UserService {
    private readonly users;
    constructor(users: Repository<User>);
    signup({ email, password, firstName, lastName, phone, address, age, }: CreateUserDto): Promise<CoreOutput>;
    findById(id: number): Promise<UserOutputDto>;
    findByEmail(email: string): Promise<UserOutputDto>;
    updateProfile(userId: number, updateUserDto: UpdateUserInputDto): Promise<CoreOutput>;
}
