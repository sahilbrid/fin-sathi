// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  occupation: { type: String, required: true },
  age: { type: Number, required: true },
  annualIncome: { type: Number, required: true },
  joinedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
