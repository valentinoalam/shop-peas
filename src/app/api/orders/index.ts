
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { OrderItem } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        items,
        subtotal,
        shippingCost,
        total,
        shippingAddressId,
        billingAddressId,
        shippingMethodId,
        paymentMethodId,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode
      } = req.body
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'No items provided' })
      }
      
      // Create order in the database
      const order = await prisma.order.create({
        data: {
          subtotal,
          shippingCost,
          total,
          email,
          firstName,
          lastName,
          address,
          city,
          state,
          zipCode,
          status: 'PROCESSING',
          shippingAddress: {
            connect: { id: shippingAddressId }
          },
          billingAddress: {
            connect: { id: billingAddressId }
          },
          shippingMethod: {
            connect: { id: shippingMethodId }
          },
          paymentMethod: {
            connect: { id: paymentMethodId }
          },
          items: {
            create: items.map((item: OrderItem) => ({
              quantity: item.quantity,
              price: item.price,
              productId: item.productId
            }))
          }
        }
      })
      
      // Update product stock
      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })
        
        if (product) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: product.stock - item.quantity
            }
          })
        }
      }
      
      return res.status(201).json(order)
    } catch (error) {
      console.error('Error creating order:', error)
      return res.status(500).json({ error: 'Failed to create order' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}