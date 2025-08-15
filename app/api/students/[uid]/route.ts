import { NextRequest, NextResponse } from 'next/server';
import Student from '@/models/Student';
import { connectDB } from '@/lib/db';

type Params = Promise<{
  uid: string;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const uid = (await params).uid;
  try {
    await connectDB();
    const student = await Student.findOne({ uid: Number(uid) });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
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

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const uid = (await params).uid;
  try {
    await connectDB();
    const student = await Student.findOneAndUpdate({
      uid: Number(uid)
    });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const uid = (await params).uid;
  try {
    await connectDB();
    const student = await Student.findOneAndDelete({
      uid: Number(uid)
    });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const uid = (await params).uid;
  const data = await req.json();
  try {
    await connectDB();
    const student = await Student.findOneAndUpdate(
      { uid: Number(uid) },
      { $set: data }
    );
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
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
