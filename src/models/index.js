// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "NONBINARY": "NONBINARY",
  "OTHER": "OTHER"
};

const { User } = initSchema(schema);

export {
  User,
  Genders
};