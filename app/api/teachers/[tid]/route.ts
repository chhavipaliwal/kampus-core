import { NextRequest, NextResponse } from 'next/server';
import Teacher from '@/models/Teacher';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

type Params = Promise<{
  tid: string;
}>;

export const GET = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const tid = (await params).tid;
    const user = req.auth?.user;
    if (user && !['admin'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    try {
      await connectDB();
      const teacher = await Teacher.findOne({ tid: Number(tid) }).select(
        user?.role === 'student' ? 'tid name email' : ''
      );
      if (!teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(teacher);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to fetch Teacher' },
        { status: 500 }
      );
    }
  }
);

export const PUT = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const tid = (await params).tid;
    const user = req.auth?.user;

    if (user && !['admin'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    try {
      await connectDB();
      const teacher = await Teacher.findOneAndUpdate({
        tid: Number(tid)
      });
      if (!Teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }
      await teacher.save();
      return NextResponse.json(Teacher);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to update Teacher' },
        { status: 500 }
      );
    }
  }
);

export const DELETE = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const tid = (await params).tid;
    const user = req.auth?.user;

    if (user && !['admin'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    try {
      await connectDB();
      const teacher = await Teacher.findOneAndDelete({
        tid: Number(tid)
      });
      if (!Teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to delete Teacher' },
        { status: 500 }
      );
    }
  }
);

export const PATCH = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const tid = (await params).tid;
    const user = req.auth?.user;

    if (user && !['admin'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const data = await req.json();
    try {
      await connectDB();
      const teacher = await Teacher.findOneAndUpdate(
        { tid: Number(tid) },
        { $set: data }
      );
      if (!teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(Teacher);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to update Teacher' },
        { status: 500 }
      );
    }
  }
);
