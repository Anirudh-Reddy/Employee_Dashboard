import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  Visa: [],
  Transcripts: [],
  IDs: [],
  Payslips: [],
});

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  employeeName: { type: String, required: true },
  age: { type: Number, required: true },
  DOB: { type: Date, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  address: { type: String, required: true },
  experience: { type: Number, required: true },
  // documentsList: { type: [String], required: true },
  // documents: { type: DocumentSchema, default: { Visa: [], Transcripts: [], IDs: [], Payslips: [] } },
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
