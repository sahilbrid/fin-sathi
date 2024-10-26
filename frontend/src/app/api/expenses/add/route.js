import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('finbuddy');
    const expense = await req.json();
    await db.collection('expenses').insertOne(expense);
    return new Response(JSON.stringify({ message: 'Expense added successfully' }), { status: 200 });
  } catch (error) {
    console.error('Failed to add expense:', error);
    return new Response('Failed to add expense', { status: 500 });
  }
}
