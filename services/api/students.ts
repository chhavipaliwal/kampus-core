'use server';

import { fetchData } from '.';
import { StudentType } from '@/types/students';

export async function getAllStudents() {
  return await fetchData<StudentType[]>('/students');
}
