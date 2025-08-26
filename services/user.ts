import { CreateUserType, UserType } from '@/types/user';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query';
import { createUser, deleteUser, getAllUsers } from '@/services/api/user';

export const useAllUsers = (): UseQueryResult<UserType[]> =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await getAllUsers();
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    }
  });
