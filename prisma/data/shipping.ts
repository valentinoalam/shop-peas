import { getLastWord, slugify } from "@/lib/utils";

export const shippingMethods = [
    // {
    //   id: "standard",
    //   name: "Standard Shipping",
    //   price: 5.99,
    //   estimated: "5-7 business days"
    // },
    // {
    //   id: "express",
    //   name: "Express Shipping",
    //   price: 12.99,
    //   estimated: "2-3 business days"
    // },
    // {
    //   id: "overnight",
    //   name: "Overnight Shipping",
    //   price: 24.99,
    //   estimated: "Next business day"
    // },
    {
      name: 'JNE Reguler',
      price: 15000,
      estimated: '2-5 Hari Kerja',
    },
    {
      name: 'J&T Express',
      price: 13000,
      estimated: '1-3 Hari Kerja',
    },
    {
      name: 'SiCepat REG',
      price: 14000,
      estimated: '2-4 Hari Kerja',
    },
    {
      name: 'GoSend Same Day',
      price: 20000,
      estimated: 'Dikirim di hari yang sama',
    },
    {
      name: 'GrabExpress Instant',
      price: 22000,
      estimated: 'Dikirim dalam beberapa jam',
    },
    {
      name: 'Pos Indonesia Reguler',
      price: 12000,
      estimated: '3-7 Hari Kerja',
    },
    {
      name: 'Ninja Xpress Standard',
      price: 13500,
      estimated: '2-4 Hari Kerja',
    },
  ];
  
  export const calculateShipping = (
    method: string, 
    subtotal: number, 
    itemCount: number
  ): number => {
    const selectedMethod = shippingMethods.find(m => slugify(m.name) === method);
    
    if (!selectedMethod) {
      return 0;
    }
    
    // Free shipping on orders over $100
    if (subtotal >= 100 && getLastWord(selectedMethod.name) === "reguler") {
      return 0;
    }
    
    // Additional fee for heavy orders (many items)
    let additionalFee = 0;
    if (itemCount > 5) {
      additionalFee = 3.99;
    }
    
    return selectedMethod.price + additionalFee;
  };