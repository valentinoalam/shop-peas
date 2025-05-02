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
  },
  {
    name: 'Transfer Bank BCA',
    icon: '/images/payment/bca.png', // Path ke ikon BCA (opsional)
  },
  {
    name: 'Transfer Bank Mandiri',
    icon: '/images/payment/mandiri.png', // Path ke ikon Mandiri (opsional)
  },
  {
    name: 'Transfer Bank BRI',
    icon: '/images/payment/bri.png', // Path ke ikon BRI (opsional)
  },
  {
    name: 'Transfer Bank BNI',
    icon: '/images/payment/bni.png', // Path ke ikon BNI (opsional)
  },
  {
    name: 'GoPay',
    icon: '/images/payment/gopay.png', // Path ke ikon GoPay (opsional)
  },
  {
    name: 'OVO',
    icon: '/images/payment/ovo.png', // Path ke ikon OVO (opsional)
  },
  {
    name: 'ShopeePay',
    icon: '/images/payment/shopeepay.png', // Path ke ikon ShopeePay (opsional)
  },
  {
    name: 'Dana',
    icon: '/images/payment/dana.png', // Path ke ikon Dana (opsional)
  },
  {
    name: 'COD (Bayar di Tempat)',
    icon: '/images/payment/cod.png', // Path ke ikon COD (opsional)
  },
  {
    name: 'Kartu Kredit/Debit',
    icon: '/images/payment/creditcard.png', // Path ke ikon Kartu Kredit/Debit (opsional)
  },
];
  
export const validatePayment = (paymentInfo: {method:string;cardNumber:number[];expiryDate:string;cvv:string}): boolean => {
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