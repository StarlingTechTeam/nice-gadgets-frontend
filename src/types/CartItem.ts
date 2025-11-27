import type { ProductCard } from './ProductCard';

export type CartItem = {
  id: string;
  product: ProductCard;
  quantity: number;
  addedAt: Date;
};

export type CartState = {
  items: CartItem[];
  updatedAt: Date;
};

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  carrier: 'novaposhta' | 'ukrposhta' | 'pickup';
};

export type ShippingAddress = {
  city: string;
  cityRef: string;
  warehouse: string;
  warehouseRef: string;
  recipientName: string;
  recipientPhone: string;
};

export type DiscountCode = {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isValid: boolean;
  errorMessage?: string;
};

export type CartSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
};

export type CartOperations = {
  addItem: (product: ProductCard, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: () => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setShippingAddress: (address: ShippingAddress) => void;
};
