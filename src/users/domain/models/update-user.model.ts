export interface UpdateUserModel {
  id: string;

  firstname: string;

  lastname: string;

  email: string;

  password?: string;

  birthdate?: Date;
}
