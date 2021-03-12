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

import { TokenModel, TokenType } from '~/auth/domain';
import { UserEntity } from '~/users/infra';

@Entity('tokens')
export class TokenEntity implements TokenModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  uuid: string;

  @AfterLoad()
  generateUUID() {
    this.uuid = this.id;
  }

  @Column({ type: 'uuid' })
  token: string;

  @Column({ type: 'enum', enum: TokenType })
  type: TokenType;

  @ManyToOne(() => UserEntity, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
