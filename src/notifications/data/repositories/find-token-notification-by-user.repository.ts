import { TokenNotificationModel } from '~/notifications/domain';
import { UserModel } from '~/users/domain';

export interface FindTokenNotificationByUserRepository {
  findTokenNotificationByUser(
    user: UserModel
  ): Promise<TokenNotificationModel[]>;
}
