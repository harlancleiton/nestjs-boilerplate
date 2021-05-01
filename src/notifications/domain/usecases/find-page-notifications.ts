import { PageModel, PaginationModel } from '~/shared/domain';
import { UserModel } from '~/users/domain';

import { NotificationModel } from '../models';

export interface FindPageNotifications {
  execute(
    user: UserModel,
    pagination: PaginationModel
  ): Promise<PageModel<NotificationModel>>;
}
