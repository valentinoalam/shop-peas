export const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimated: "5-7 business days"
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimated: "2-3 business days"
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 24.99,
      estimated: "Next business day"
    }
  ];
  
  export const calculateShipping = (
    method: string, 
    subtotal: number, 
    itemCount: number
  ): number => {
    const selectedMethod = shippingMethods.find(m => m.id === method);
    
    if (!selectedMethod) {
      return 0;
    }
    
    // Free shipping on orders over $100
    if (subtotal >= 100 && selectedMethod.id === "standard") {
      return 0;
    }
    
    // Additional fee for heavy orders (many items)
    let additionalFee = 0;
    if (itemCount > 5) {
      additionalFee = 3.99;
    }
    
    return selectedMethod.price + additionalFee;
  };