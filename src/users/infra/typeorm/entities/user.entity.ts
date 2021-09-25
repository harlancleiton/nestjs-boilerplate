import {
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert
} from 'typeorm';

import { UserModel } from '~/users/domain';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  uuid: string;

  @AfterLoad()
  @AfterInsert()
  generateUUID() {
    this.uuid = this.id;
  }

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  fullname: string;

  @AfterLoad()
  @AfterInsert()
  generateFullname() {
    this.fullname = `${this.firstname} ${this.lastname}`;
  }

  @Column({ length: 80, unique: true })
  email: string;

  @Column({ length: 180, unique: true })
  password: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
