import { ResetPasswordModel } from '../models';

export interface ResetPassword {
  execute(resetPassword: ResetPasswordModel): Promise<void>;
}
