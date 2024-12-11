// pages/api/add-product.js
import clientPromise from '@/lib/db'; // Import your MongoDB connection logic

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, price, description, category } = req.body;

  // Validate the incoming data
  if (!name || !price || !description || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Get the database instance
    
    // Define the product document
    const newProduct = {
      name,
      price,
      description,
      category,
      createdAt: new Date(), // Automatically add the createdAt date
      updatedAt: new Date(), // Automatically add the updatedAt date
    };

    // Insert the product into the 'products' collection
    const result = await db.collection('products').insertOne(newProduct);

    res.status(201).json({ success: true, product: result.ops[0] });
  } catch (error) {
    console.error('Failed to insert product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
}
