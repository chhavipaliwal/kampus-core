import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/Student';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

type Params = Promise<{
  sid: string;
}>;

export const GET = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const sid = (await params).sid;
    const user = req.auth?.user;
    if (user && !['admin', 'moderator', 'teacher'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }
    try {
      await connectDB();
      const student = await Student.findOne({ sid: Number(sid) });
      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(student);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to fetch student' },
        { status: 500 }
      );
    }
  }
);

export const PUT = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const sid = (await params).sid;
    const user = req.auth?.user;

    if (user && !['admin', 'moderator'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    try {
      await connectDB();
      const student = await Student.findOneAndUpdate({
        sid: Number(sid)
      });
      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }
      await student.save();
      return NextResponse.json(student);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to update student' },
        { status: 500 }
      );
    }
  }
);

export const DELETE = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const sid = (await params).sid;
    const user = req.auth?.user;

    if (user && !['admin'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    try {
      await connectDB();
      const student = await Student.findOneAndDelete({
        sid: Number(sid)
      });
      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to delete student' },
        { status: 500 }
      );
    }
  }
);

export const PATCH = auth(
  async (req: NextAuthRequest, { params }: { params: Params }) => {
    const sid = (await params).sid;
    const user = req.auth?.user;

    if (user && !['admin', 'moderator'].includes(user?.role)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const data = await req.json();
    try {
      await connectDB();
      const student = await Student.findOneAndUpdate(
        { sid: Number(sid) },
        { $set: data }
      );
      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(student);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Failed to update student' },
        { status: 500 }
      );
    }
  }
);
