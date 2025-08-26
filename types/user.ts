import { ValuesOf } from '@/lib/utils';
import { Base } from '@/lib/interface';

export const genders = ['male', 'female', 'other'] as const;

export const userStatuses = [
  'active',
  'inactive',
  'blocked',
  'deleted',
  'unverified'
] as const;

export const userRoles = ['admin', 'moderator', 'teacher', 'student'] as const;

export interface UserType extends Base {
  uid: number;
  email: string;
  phone: string;
  password: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  gender: Gender;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  state?: string;
}

export interface AuthUser {
  user?: {
    name: string;
    email: string;
    role: UserType['role'];
    date: string | Date;
    id: string;
    uid: number;
    image: string;
  };
  expires?: string;
}

export type CreateUserType = Pick<
  UserType,
  | 'email'
  | 'phone'
  | 'password'
  | 'name'
  | 'gender'
  | 'dateOfBirth'
  | 'address'
  | 'city'
  | 'state'
>;

export type Gender = ValuesOf<typeof genders>;
export type UserStatus = ValuesOf<typeof userStatuses>;
export type UserRole = ValuesOf<typeof userRoles>;
