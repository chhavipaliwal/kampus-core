import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllStudents } from './api/students';
import { StudentType } from '@/types/students';

export const useAllStudents = (): UseQueryResult<StudentType[]> =>
  useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await getAllStudents();
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    }
  });
