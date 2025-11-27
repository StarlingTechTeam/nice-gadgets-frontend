import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductCard } from '@/types/ProductCard';
import type {
  CartItem,
  CartState,
  DiscountCode,
  ShippingAddress,
  ShippingMethod,
} from '@/types/CartItem';
import { validateDiscountCode } from '@/services/discountService';

interface CartStore extends CartState {
  shippingMethod: ShippingMethod | null;
  shippingAddress: ShippingAddress | null;
  discountCode: DiscountCode | null;

  addItem: (product: ProductCard, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  setShippingMethod: (method: ShippingMethod) => void;
  setShippingAddress: (address: ShippingAddress) => void;

  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: () => void;

  getSubtotal: () => number;
  getTotalWithoutDiscount: () => number;
  getShipping: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      updatedAt: new Date(),
      shippingMethod: null,
      shippingAddress: null,
      discountCode: null,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.product.capacity === product.capacity &&
              item.product.color === product.color,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id ?
                  { ...item, quantity: item.quantity + quantity }
                : item,
              ),
              updatedAt: new Date(),
            };
          }

          const newItem: CartItem = {
            id: `${product.id}-${product.capacity}-${product.color}-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date(),
          };

          return {
            items: [...state.items, newItem],
            updatedAt: new Date(),
          };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          updatedAt: new Date(),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item,
          ),
          updatedAt: new Date(),
        })),

      clearCart: () =>
        set({
          items: [],
          shippingMethod: null,
          shippingAddress: null,
          discountCode: null,
          updatedAt: new Date(),
        }),

      setShippingMethod: (method) =>
        set({
          shippingMethod: method,
          updatedAt: new Date(),
        }),

      setShippingAddress: (address) =>
        set({
          shippingAddress: address,
          updatedAt: new Date(),
        }),

      applyDiscount: async (code) => {
        try {
          const discount = await validateDiscountCode(
            code,
            get().getSubtotal(),
          );

          if (discount.isValid) {
            set({
              discountCode: discount,
              updatedAt: new Date(),
            });
          } else {
            set({
              discountCode: {
                ...discount,
                errorMessage: 'Invalid or expired discount code',
              },
              updatedAt: new Date(),
            });
          }
        } catch (error) {
          set({
            discountCode: {
              code,
              type: 'fixed',
              value: 0,
              isValid: false,
              errorMessage: 'Failed to validate discount code' + error,
            },
            updatedAt: new Date(),
          });
        }
      },

      removeDiscount: () =>
        set({
          discountCode: null,
          updatedAt: new Date(),
        }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      },

      getShipping: () => {
        return get().shippingMethod?.price || 0;
      },

      getDiscount: () => {
        const { discountCode } = get();

        if (!discountCode || !discountCode.isValid) {
          return 0;
        }

        const subtotal = get().getSubtotal();

        if (discountCode.type === 'percentage') {
          return (subtotal * discountCode.value) / 100;
        }

        return discountCode.value;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const discount = get().getDiscount();

        return subtotal + shipping - discount;
      },
      getTotalWithoutDiscount: () => {
        const { items } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.fullPrice * item.quantity,
          0,
        );
        const shipping = get().getShipping();

        return subtotal + shipping;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        shippingMethod: state.shippingMethod,
        discountCode: state.discountCode,
      }),
    },
  ),
);
