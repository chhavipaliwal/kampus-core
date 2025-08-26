'use server';

import { fetchData } from '.';
import { StudentType, CreateStudentType } from '@/types/students';

export async function getAllStudents() {
  return await fetchData<StudentType[]>('/students');
}
export async function createStudent(doctor: CreateStudentType) {
  return await fetchData<StudentType>('/doctors', {
    method: 'POST',
    data: doctor
  });
}
