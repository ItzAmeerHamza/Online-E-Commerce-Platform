import { CoreEntity } from '../../common/entities/core.entity';
export declare class User extends CoreEntity {
    userId: String;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    age: number;
    address: string;
    isAdmin: boolean;
}
