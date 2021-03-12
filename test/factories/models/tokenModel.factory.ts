import * as faker from 'faker';
import { Factory } from 'fishery';

import { TokenModel, TokenType } from '~/auth/domain';

import { userModelFactory } from './userModel.factory';

export const tokenModelFactory = Factory.define<TokenModel>(() => {
  const id = faker.random.uuid();
  const uuid = id;
  const type = faker.random.objectElement(
    Object.values(TokenType)
  ) as TokenType;

  return {
    id,
    uuid,
    token: faker.random.alphaNumeric(32),
    type,
    user: userModelFactory.build(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
