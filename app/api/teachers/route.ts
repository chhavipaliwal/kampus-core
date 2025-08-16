import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/Student';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

export const GET = auth(async (req: NextAuthRequest) => {
  const user = req.auth?.user;

  if (user && !['admin', 'teacher'].includes(user?.role)) {
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
