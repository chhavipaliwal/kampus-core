import mongoose from 'mongoose';
import { string } from 'yup';

const StudentSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    age: {
      type: Number,
      min: [0, 'Age must be positive']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    class: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
const Student =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;
