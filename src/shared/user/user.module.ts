import { Module } from '@nestjs/common';

import { UserServiceImpl } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '#entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserServiceImpl],
  exports: [UserServiceImpl],
})
export class UserModule { }
