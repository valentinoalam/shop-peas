
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid order ID' })
  }
  
  if (req.method === 'GET') {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingMethod: true,
          paymentMethod: true
        }
      })
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' })
      }
      
      return res.status(200).json(order)
    } catch (error) {
      console.error('Error fetching order:', error)
      return res.status(500).json({ error: 'Failed to fetch order' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
