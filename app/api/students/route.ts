import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/Student';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';
import { faker } from '@faker-js/faker';
import User from '@/models/User';

export const GET = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (user && !['admin', 'moderator', 'teacher'].includes(user?.role)) {
    return NextResponse.json({ message: 'Access denied' }, { status: 403 });
  }
  try {
    await connectDB();
    const students = await Student.find();

    return NextResponse.json(students);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
});

export const POST = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (user && !['admin', 'moderator'].includes(user?.role)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
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
    const student = await Student.create(data);
    await User.create({
      uid: student.sid,
      email: data.email,
      password: faker.internet.password(),
      name: data.name,
      role: 'student'
    });

    // await students.save();
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to add students' },
      { status: 500 }
    );
  }
});
