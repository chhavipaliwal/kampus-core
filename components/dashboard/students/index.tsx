'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getStudents() {
  const res = await axios.get('/api/students');
  if (!res.data) throw new Error('Network response was not ok');
  return res.data;
}

export default function Students() {
  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });

  console.log('isLoading', isLoading);

  return (
    <div>
      <h1>Students</h1>
    </div>
  );
}
