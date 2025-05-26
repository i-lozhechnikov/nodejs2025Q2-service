import { IsUUID } from 'class-validator';
import { IsUserExists } from '../validators/user.exists.validator.decorator';

export class UserIdParamDto {
  @IsUUID()
  @IsUserExists()
  id: string;
}
