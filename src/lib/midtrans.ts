// This is a simplified version of the Midtrans client
// In a real application, you would use the midtrans-client package
interface TrxParams{
  transaction_details: {
      order_id: string
      gross_amount: number
  }
  credit_card:{
      secure : boolean
  }
  customer_details: {
      first_name: string
      last_name: string
      email: string
      phone: string
  }
}
export class Midtrans {
  private serverKey: string
  private isProduction: boolean
  private apiUrl: string

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY_SANDBOX || ""
    this.isProduction = process.env.NODE_ENV === "production"
    this.apiUrl = this.isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions"
  }

  async createTransaction(params: TrxParams) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(this.serverKey + ":").toString("base64")}`,
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to create Midtrans transaction")
    }

    return response.json()
  }
}
