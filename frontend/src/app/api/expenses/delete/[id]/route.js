import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('finbuddy');
    const { id } = params;
    await db.collection('expenses').deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ message: 'Expense deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Failed to delete expense:', error);
    return new Response('Failed to delete expense', { status: 500 });
  }
}
