import { UserModel } from '~/users/domain';

import { NotificationStatus, NotificationType } from '../enums';

export interface NotificationModel<TData = any> {
  id: string;

  uuid: string;

  title: string;

  content: string;

  user: UserModel;

  type: NotificationType;

  status: NotificationStatus;

  data: TData;

  createdAt: Date;

  updatedAt: Date;
}
