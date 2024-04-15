import { ModelInit, MutableModel, __modelMeta__, OptionallyManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NONBINARY = "NONBINARY",
  OTHER = "OTHER"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly birthdate?: string | null;
  readonly gender?: Genders | keyof typeof Genders | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly birthdate?: string | null;
  readonly gender?: Genders | keyof typeof Genders | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}