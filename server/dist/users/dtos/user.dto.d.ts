import { CoreOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';
export declare class UserOutputDto extends CoreOutput {
    user?: User;
}
