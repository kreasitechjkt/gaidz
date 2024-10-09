import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.interface';
import { UserEntity } from '#db/entities';
import { MissingFieldsError } from '#common/errors';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) { }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        username: username,
      },
    });
  }

  async validateOrElseThrow(user: UserEntity): Promise<UserEntity | never> {
    if (!user.userId) {
      if (
        !user.username ||
        !user.email ||
        user.username === '' ||
        user.email === ''
      ) {
        throw new MissingFieldsError('missing fields: username or email');
      }
    }

    return Promise.resolve(new UserEntity({ ...user }));
  }

  public async create(_user: UserEntity): Promise<UserEntity | never> {
    let user = await this.validateOrElseThrow(_user);

    return this.repository.save(user, { reload: true });
  }
}
