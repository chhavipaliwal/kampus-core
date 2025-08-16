import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

//@ts-expect-error - mongoose-sequence is not typed
const AutoIncrement = mongooseSequence(mongoose);

const StudentSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    dob: {
      type: Date
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
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    },
    parentDetails: {
      fatherName: String,
      motherName: String,
      guardianPhone: String,
      guardianEmail: String
    },
    class: {
      type: String
    },
    rollNumber: {
      type: String
    },
    section: {
      type: String
    },
    admissionDate: {
      type: Date,
      default: Date.now
    },
    terminationDate: {
      type: Date
    },
    bloodGroup: {
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

// @ts-ignore
StudentSchema.plugin(AutoIncrement, { inc_field: 'uid', start_seq: 100000 });

const Student =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;
