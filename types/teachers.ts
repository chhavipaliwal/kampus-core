import { UserType } from './user';
import { ValuesOf } from '@/lib/utils';

export const genders = ['male', 'female', 'other'] as const;

export const teacherStatuses = [
  'active',
  'inactive',
  'blocked',
  'deleted',
  'unverified'
] as const;

export interface TeacherType extends UserType {
  tid: number;
  name: string;
  email: string;
  age: number;
  dob?: Date;
  address: string;
  subjects: string[];
  department: string;
  hiredDate?: Date;
}
export type Gender = ValuesOf<typeof genders>;
export type TeacherStatus = ValuesOf<typeof teacherStatuses>;
export type TeacherCreationType = 'existing' | 'new';
export type CreateTeacherType = {
  name: string;
  email: string;
  age: number;
  dob?: Date;
  address: string;
  subjects: string[];
  department: string;
  hiredDate?: Date;
};
