'use server';

import { addToast } from '@heroui/react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query';
import { CreateStudentType, StudentType } from '@/types/students';
import { getAllStudents } from './api/students';
import { ApiResponse } from './api';
import { createStudent } from './api/students';

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

export const useCreateStudent = (): UseMutationResult<
  ApiResponse<StudentType>,
  Error,
  CreateStudentType
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (student: CreateStudentType) => {
      const res = await createStudent(student);
      if (res.success) {
        return res;
      }
      throw new Error(res.message);
    },
    onSuccess: (data: ApiResponse<StudentType>) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      addToast({
        title: data.message,
        color: 'success'
      });
    },
    onError: (error: Error) => {
      addToast({
        title: error.message,
        color: 'danger'
      });
    }
  });
};
