'use server';

import { fetchData } from '.';
import { TeacherType } from '@/types/teachers';

export async function getAllTeachers() {
  return await fetchData<TeacherType[]>('/teachers');
}
