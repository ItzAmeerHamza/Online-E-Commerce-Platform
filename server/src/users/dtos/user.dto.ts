import { CoreOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

export class UserOutputDto extends CoreOutput {
  user?: User;
}