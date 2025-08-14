import mongoose from 'mongoose';
// @ts-ignore
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid'
      ]
    },
    phone: String,
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
