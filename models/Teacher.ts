import mongoose from 'mongoose';

import mongooseSequence from 'mongoose-sequence';

//@ts-expect-error - mongoose-sequence is not typed
const AutoIncrement = mongooseSequence(mongoose);

const TeacherSchema = new mongoose.Schema(
  {
    tid: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
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
    department: {
      type: String,
      required: true
    },
    subjects: [
      {
        type: String
      }
    ],
    classesAssigned: [
      {
        type: String
      }
    ],
    hireDate: {
      type: Date,
      default: Date.now
    },
    qualification: {
      type: String
    },
    experience: {
      type: Number,
      min: [0, 'Experience must be positive']
    },
    salary: {
      type: Number
    },
    address: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

//@ts-ignore
TeacherSchema.plugin(AutoIncrement, { inc_field: 'tid', start_seq: 1000 });

const Teacher =
  mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
export default Teacher;
