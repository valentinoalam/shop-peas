import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const userId = session.user.id;
  const { productId } = req.query;
  
  // DELETE request to remove an item from wishlist
  if (req.method === 'DELETE') {
    try {
      // Remove product from wishlist (disconnect the relation)

      if(productId)
      await prisma.user.update({
        where: { id: userId },
        data: {
          wishlist: {
            disconnect: { id: productId as string },
          },
        },
      });
      
      return res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return res.status(500).json({ error: 'Failed to remove product from wishlist' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}