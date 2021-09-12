import {
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { UserTokenModel, UserTokenType } from '~/auth/domain';
import { UserEntity } from '~/users/infra';

@Entity('tokens')
export class UserTokenEntity implements UserTokenModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  uuid: string;

  @AfterLoad()
  generateUUID() {
    this.uuid = this.id;
  }

  @Column({ type: 'uuid' })
  token: string;

  @Column({ type: 'enum', enum: UserTokenType })
  type: UserTokenType;

  @ManyToOne(() => UserEntity, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
