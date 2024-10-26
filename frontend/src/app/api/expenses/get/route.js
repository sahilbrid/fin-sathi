import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    console.log("Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("MongoDB connected successfully!");

    const db = client.db('finbuddy'); // Replace with your database name
    const expenses = await db.collection('expenses').find({}).toArray();

    console.log("Fetched expenses:", expenses);
    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/expenses/get:", error.message);
    console.error("Stack trace:", error.stack);
    return new Response(JSON.stringify({ error: "Failed to fetch expenses" }), { status: 500 });
  }
}
