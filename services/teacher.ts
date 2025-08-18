import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllTeachers } from './api/teachers';
import { TeacherType } from '@/types/teachers';

export const useAllTeachers = (): UseQueryResult<TeacherType[]> =>
  useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await getAllTeachers();
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    }
  });
