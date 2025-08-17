import { NextRequest, NextResponse } from 'next/server';
import Teacher from '@/models/Teacher';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';
import { faker } from '@faker-js/faker';

export const GET = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (user && !['admin'].includes(user?.role)) {
    return NextResponse.json({ message: 'Access denied' }, { status: 403 });
  }
  try {
    await connectDB();
    const teachers = await Teacher.find();

    return NextResponse.json(teachers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
});

export const POST = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (user && !['admin'].includes(user?.role)) {
    return NextResponse.json({ message: 'Access denied' }, { status: 403 });
  }

  try {
    const data = await req.json();
    if (!data || !data.name || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    await connectDB();
    const teacher = await Teacher.create(data);
    await User.create({
      uid: teacher.tid,
      email: data.email,
      password: faker.internet.password(),
      name: data.name,
      role: 'teacher'
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to add teacher' },
      { status: 500 }
    );
  }
});
