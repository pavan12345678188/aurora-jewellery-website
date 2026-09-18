import { CartItem } from "./cart";

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  deliveryMethod: {
    title: string;
    courier: string;
    estimatedDelivery: string;
  };
  paymentMethod: {
    type: "upi" | "card" | "netbanking" | "concierge";
    label: string;
    reference: string;
  };
  specialInstructions?: string;
  giftPackaging: boolean;
  status: "Confirmed" | "Insured Transit" | "Delivered";
};

const ORDERS_KEY = "aurelia-orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((o) => o.id === id);
}
