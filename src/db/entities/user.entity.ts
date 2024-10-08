import { AppProvider } from 'src/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
    name: 'user_id',
  })
  public userId?: number;

  @Column({
    type: 'varchar',
    name: 'username',
    unique: true,
    nullable: false,
  })
  public username: string;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
    nullable: false,
  })
  public email: string;

  @Column({
    type: 'text',
    name: 'password',
    unique: true,
    nullable: false,
  })
  public password: string;

  @Column({
    type: 'text',
    name: 'salt',
    nullable: true,
  })
  public salt: string;

  @Column({
    type: 'enum',
    enum: AppProvider,
    name: 'provider',
    nullable: false,
  })
  public provider: AppProvider;

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial ? partial : {});
  }
}
