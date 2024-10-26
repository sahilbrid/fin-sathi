// pages/api/register.js
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const { clerkId, name, email, occupation, age, annualIncome } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Create new user
    const user = new User({
      clerkId,
      name,
      email,
      occupation,
      age: parseInt(age),
      annualIncome: parseFloat(annualIncome),
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}