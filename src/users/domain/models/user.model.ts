export interface UserModel {
  id: string;

  uuid: string;

  firstname: string;

  lastname: string;

  email: string;

  password: string;

  birthdate?: Date;

  createdAt: Date;

  updatedAt: Date;
}
