import { UserType } from '@/types/user';

export type ChipColorType = UserType['role'];

export const chipColorMap: Record<
  ChipColorType,
  {
    text: string;
    bg: string;
  }
> = {
  // for roles
  admin: {
    text: 'bg-red-500',
    bg: 'bg-red-100'
  },
  moderator: {
    text: 'bg-blue-500',
    bg: 'bg-blue-100'
  },
  teacher: {
    text: 'bg-green-500',
    bg: 'bg-green-100'
  },
  student: {
    text: 'bg-yellow-500',
    bg: 'bg-yellow-100'
  }
};
