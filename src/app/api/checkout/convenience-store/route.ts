import { NextResponse } from "next/server"
// import Xendit from 'xendit-node'
// import midtransClient from 'midtrans-client'

// These would be your payment gateway API keys in a real implementation
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
const XENDIT_API_KEY = process.env.XENDIT_API_KEY

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, orderId, customerDetails, storeType } = body

    // Validate store type
    if (!["alfamart", "indomaret"].includes(storeType)) {
      return NextResponse.json({ error: "Invalid store type" }, { status: 400 })
    }

    // Choose which payment gateway to use (Midtrans or Xendit)
    // For this example, we'll use Midtrans for demonstration
    const useXendit = false // Toggle this to switch between Midtrans and Xendit

    if (useXendit) {
      // Xendit implementation

      // In a real implementation, you would use the Xendit Node.js library
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Xendit = require('xendit-node')
      const x = new Xendit({
        secretKey: XENDIT_API_KEY,
      })
      
      const { RetailOutlet } = x
      const retailOutletSpecificOptions = {}
      const retailOutlet = new RetailOutlet(retailOutletSpecificOptions)
      
      const retailOutletType = storeType === 'alfamart' ? 'ALFAMART' : 'INDOMARET'
      
      const mockXenditResponse = await retailOutlet.createFixedPaymentCode({
        externalID: orderId,
        retailOutletName: retailOutletType,
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        expectedAmount: amount,
        paymentCode: generatePaymentCode(storeType),
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })

      // Mock Xendit response
      // const mockXenditResponse = {
      //   id: `ro-${Date.now()}`,
      //   external_id: orderId,
      //   retail_outlet_name: storeType === "alfamart" ? "ALFAMART" : "INDOMARET",
      //   payment_code: generatePaymentCode(storeType),
      //   expected_amount: amount,
      //   is_single_use: true,
      //   expiration_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      //   status: "ACTIVE",
      // }

      return NextResponse.json({
        success: true,
        payment_code: mockXenditResponse.payment_code,
        store: storeType,
        amount: mockXenditResponse.expected_amount,
        expiry_time: mockXenditResponse.expiration_date,
      })
    } else {
      // Midtrans implementation
      
      // In a real implementation, you would use the Midtrans Node.js library
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const midtransClient = require('midtrans-client')
      
      // Create Core API instance
      const core = new midtransClient.CoreApi({
        isProduction: false,
        serverKey: MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
      })
      
      const parameter = {
        payment_type: "cstore",
        transaction_details: {
          order_id: orderId,
          gross_amount: amount
        },
        customer_details: {
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName,
          email: customerDetails.email,
          phone: customerDetails.phone
        },
        cstore: {
          store: storeType,
          message: "Payment for order #" + orderId
        }
      }
      
      const mockMidtransResponse = await core.charge(parameter)


      // Mock Midtrans response
      // const mockMidtransResponse = {
      //   status_code: "201",
      //   status_message: "Success, cstore transaction is created",
      //   transaction_id: `${storeType}-${Date.now()}`,
      //   order_id: orderId,
      //   gross_amount: amount.toString(),
      //   payment_type: "cstore",
      //   transaction_time: new Date().toISOString(),
      //   transaction_status: "pending",
      //   payment_code: generatePaymentCode(storeType),
      //   store: storeType,
      //   fraud_status: "accept",
      //   expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      // }

      return NextResponse.json({
        success: true,
        payment_code: mockMidtransResponse.payment_code,
        store: mockMidtransResponse.store,
        amount: mockMidtransResponse.gross_amount,
        expiry_time: mockMidtransResponse.expiry_time,
      })
    }
  } catch (error) {
    console.error("Convenience store payment error:", error)
    return NextResponse.json({ error: "Failed to process convenience store payment" }, { status: 500 })
  }
}

// Helper function to generate a random payment code
function generatePaymentCode(storeType: string): string {
  // Different formats for different stores
  if (storeType === "alfamart") {
    // Alfamart typically uses 8 digits
    return Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0")
  } else {
    // Indomaret typically uses 10-12 digits
    return Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0")
  }
}
