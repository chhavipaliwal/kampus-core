import { auth } from '@/auth';
import { unauthorized } from 'next/navigation';

const roleBasedContent = {
  student: <h1>This is student page</h1>,
  admin: <h1>This is admin page</h1>,
  teacher: <h1>This is teacher page</h1>
};

export default async function Home() {
  const session = await auth();

  if (!session) {
    unauthorized();
  }

  return <>{!!session.user?.role && roleBasedContent[session.user.role]}</>;
}
