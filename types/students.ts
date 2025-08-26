import { UserType } from './user';
import { ValuesOf } from '@/lib/utils';

export const genders = ['male', 'female', 'other'] as const;

export const studentStatuses = [
  'active',
  'inactive',
  'blocked',
  'deleted',
  'unverified'
] as const;

export interface StudentType extends UserType {
  sid: number;
  name: string;
  email: string;
  age: number;
  dob?: Date;
  phone: string;
  address: string;
  class: string;
  section?: string;
  rollNumber?: string;
  admissionDate?: Date;
  terminationDate?: Date;
}
export type Gender = ValuesOf<typeof genders>;
export type studentStatus = ValuesOf<typeof studentStatuses>;
export type StudentCreationType = 'existing' | 'new';

export type CreateStudentType = {
  creation_type: 'new' | 'existing';
  // If existing, the UID of the user to create a student from
  uid?: number;
  name: string;
  email: string;
  age: number;
  dob?: Date;
  phone: string;
  gender: Gender;
  address: string;
  class: string;
  section?: string;
  rollNumber?: string;
  admissionDate?: Date;
  terminationDate?: Date;
};
