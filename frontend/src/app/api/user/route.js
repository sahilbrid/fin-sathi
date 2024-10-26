import { getAuth } from '@clerk/nextjs/server';
import { Clerk } from '@clerk/clerk-sdk-node';

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated.' });
    }

    // Retrieve the user data from Clerk
    const user = await Clerk.users.getUser(userId);

    res.status(200).json({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
