'use server';

import { fetchData } from '.';

import { CreateUserType, UserType } from '@/types/user';

export async function getAllUsers() {
  return await fetchData<UserType[]>('/users');
}

export async function createUser(user: CreateUserType) {
  return await fetchData<UserType>('/users', {
    method: 'POST',
    data: user
  });
}

// PUT
export async function updateUser(user: UserType) {
  return await fetchData<UserType>(`/users/${user.uid}`, {
    method: 'PUT',
    data: user
  });
}

// DELETE
export async function deleteUser(uid: number) {
  return await fetchData<UserType>(`/users/${uid}`, {
    method: 'DELETE'
  });
}
