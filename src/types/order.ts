// types/order.ts
export interface SerializedOrder {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
      quantity: number;
      price: number;
      product: {
        id: string;
        name: string;
        price: number;
        createdAt: string;
        updatedAt: string;
      };
    }>;
    shippingMethod: {
      name: string;
      price: number;
      estimated: string;
    };
    paymentMethod: {
      name: string;
      icon: string;
    };
  }