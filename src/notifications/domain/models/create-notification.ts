import { UserModel } from '~/users/domain';

import { NotificationType } from '../enums';

export class CreateNotificationModel<TData = any> {
  user: UserModel;

  title: string;

  content: string;

  type: NotificationType;

  data?: TData;
}
