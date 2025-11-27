import { useState, useCallback } from 'react';
import { useCartStore } from '@store/cartStore';
import type { ProductCard } from '@/types/ProductCard';
import type { ShippingAddress, ShippingMethod } from '@/types/CartItem';

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    items,
    shippingMethod,
    shippingAddress,
    discountCode,
    addItem: addItemToStore,
    removeItem: removeItemFromStore,
    updateQuantity: updateQuantityInStore,
    clearCart: clearCartInStore,
    setShippingMethod: setShippingMethodInStore,
    setShippingAddress: setShippingAddressInStore,
    applyDiscount: applyDiscountInStore,
    removeDiscount: removeDiscountFromStore,
    getSubtotal,
    getShipping,
    getDiscount,
    getTotal,
    getTotalWithoutDiscount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const discount = getDiscount();
  const total = getTotal();
  const totalWithoutDiscount = getTotalWithoutDiscount();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartLength = itemCount;

  const addItem = useCallback(
    async (product: ProductCard, quantity: number = 1) => {
      try {
        setIsLoading(true);
        setError(null);
        addItemToStore(product, quantity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add item');
      } finally {
        setIsLoading(false);
      }
    },
    [addItemToStore],
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        removeItemFromStore(itemId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove item');
      } finally {
        setIsLoading(false);
      }
    },
    [removeItemFromStore],
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        setIsLoading(true);
        setError(null);

        if (quantity === 0) {
          await removeItem(itemId);
          return;
        }

        updateQuantityInStore(itemId, quantity);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update quantity',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [updateQuantityInStore, removeItem],
  );

  const setShippingMethod = useCallback(
    (method: ShippingMethod) => {
      setShippingMethodInStore(method);
    },
    [setShippingMethodInStore],
  );

  const setShippingAddress = useCallback(
    (address: ShippingAddress) => {
      setShippingAddressInStore(address);
    },
    [setShippingAddressInStore],
  );

  const applyDiscount = useCallback(
    async (code: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await applyDiscountInStore(code);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to apply discount',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [applyDiscountInStore],
  );

  const removeDiscount = useCallback(() => {
    removeDiscountFromStore();
  }, [removeDiscountFromStore]);

  const clearCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      clearCartInStore();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  }, [clearCartInStore]);

  return {
    items,
    shippingMethod,
    shippingAddress,
    discountCode,

    subtotal,
    shipping,
    discount,
    total,
    totalWithoutDiscount,
    itemCount,
    cartLength,

    isLoading,
    error,

    addItem,
    removeItem,
    updateQuantity,
    setShippingMethod,
    setShippingAddress,
    applyDiscount,
    removeDiscount,
    clearCart,
  };
};
