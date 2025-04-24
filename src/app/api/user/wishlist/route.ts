// src/api/user/wishlist.js (Next.js API route example)
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the authenticated user from the session
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = session.user.id;

  // GET request to fetch wishlist items
  if (req.method === 'GET') {
    try {
      // Get all products in the user's wishlist
      const wishlist = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          wishlist: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              image: true,
              category: true,
              stock: true,
            },
          },
        },
      });

      return res.status(200).json(wishlist?.wishlist || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  }
  
  // POST request to add an item to wishlist
  if (req.method === 'POST') {
    try {
      const { productId } = req.body;
      
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
      
      // Add product to wishlist (connect the relation)
      await prisma.user.update({
        where: { id: userId },
        data: {
          wishlist: {
            connect: { id: productId },
          },
        },
      });
      
      return res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return res.status(500).json({ error: 'Failed to add product to wishlist' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
