import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { validate as isUUID } from 'uuid';

import {
  NotificationModel,
  NotificationStatus,
  NotificationType
} from '~/notifications/domain';
import { UserModel } from '~/users/domain';

@Schema({ timestamps: true, id: true })
export class Notification implements NotificationModel {
  id: string;

  @Prop({ required: true, validate: isUUID })
  uuid: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  // TODO add UserSchema
  @Prop({ type: Object })
  user: UserModel;

  @Prop({ type: String, enum: Object.values(NotificationType) })
  type: NotificationType;

  @Prop({ type: String, enum: Object.values(NotificationStatus) })
  status: NotificationStatus;

  @Prop({ type: Object })
  data?: any;

  createdAt: Date;

  updatedAt: Date;
}

export type NotificationDocument = Notification & Document;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
