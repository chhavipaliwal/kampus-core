import { $FixMe } from '@/types';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

// get user by uid from param
export async function GET(request: NextAuthRequest, context: $FixMe) {
  const userId = (await context.params).uid;
  const role = request.auth?.user?.role ?? '';

  const ALLOWED_ROLES = ['admin', 'student'];

  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// update user by uid from param
export const PUT = auth(async function PUT(
  request: NextAuthRequest,
  context: $FixMe
) {
  const userId = (await context.params).uid;
  const role = request.auth?.user?.role ?? '';

  const ALLOWED_ROLES = ['admin', 'user'];

  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (role === 'admin' || request.auth?.user?.uid === user.uid) {
      user = await User.findByIdAndUpdate(userId, await request.json(), {
        new: true
      });
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
});

// delete user by uid from param
export const DELETE = auth(async function DELETE(
  request: NextAuthRequest,
  context: $FixMe
) {
  const userId = (await context.params).uid;
  const role = request.auth?.user?.role ?? '';

  const ALLOWED_ROLES = ['admin', 'user'];

  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();

    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (role === 'admin' || request.auth?.user?.uid === user.uid) {
      await User.findByIdAndDelete(userId);
      return NextResponse.json({ message: 'User deleted' });
    } else {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
});
