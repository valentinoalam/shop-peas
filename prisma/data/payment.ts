export const paymentMethods = [
    {
      id: "credit",
      name: "Credit / Debit Card",
      icon: "credit-card"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "paypal"
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: "apple"
    },
    {
      id: "google",
      name: "Google Pay",
      icon: "google"
    }
  ];
  
export const validatePayment = (paymentInfo: any): boolean => {
	// This is a mock validation - in a real app, you'd integrate with a payment processor
	if (paymentInfo.method === "credit") {
			// Simple validation for credit card
			return (
			paymentInfo.cardNumber?.length === 16 &&
			paymentInfo.expiryDate?.length === 5 &&
			paymentInfo.cvv?.length === 3
			);
	}

	// For other payment methods, assume validation happens on their respective platforms
	return true;
};