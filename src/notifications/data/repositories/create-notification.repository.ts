import { NotificationModel } from '~/notifications/domain';
import { DeepPartial } from '~/shared/domain';

export interface CreateNotificationRepository {
  create(
    entityLike: DeepPartial<NotificationModel>
  ): Promise<NotificationModel>;
}
