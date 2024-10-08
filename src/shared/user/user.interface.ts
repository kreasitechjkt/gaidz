import { UserEntity } from '#entity/user.entity';

export interface UserService {
  // TODO: docs
  findByUsername(username: string): Promise<UserEntity | null>;
  validateOrElseThrow(user: UserEntity): Promise<UserEntity | never>;
  create(user: UserEntity): Promise<UserEntity | never>;
}
