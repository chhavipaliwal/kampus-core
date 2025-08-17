'use server';

import { Stu } from '@/types/newsletter';
import { fetchData } from '..';

export async function getAllStudents() {
  return await fetchData<StudentType[]>('/students');
}
