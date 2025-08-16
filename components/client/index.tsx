'use client';
import { useSession } from 'next-auth/react';

export default function Client() {
  const { data: session } = useSession();

  console.log('Session:', session);
  return <h1>This is the client page</h1>;
}
