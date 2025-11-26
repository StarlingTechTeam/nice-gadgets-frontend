import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ProductCard } from '@/types/ProductCard';
import { ProductsSelectionContext } from './ProductsSelectionContext';

const FAVORITES_STORAGE_KEY = 'nice-gadgets:favorites';
const CART_STORAGE_KEY = 'nice-gadgets:cart';

const readFromStorage = (key: string): ProductCard[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? (parsed as ProductCard[]) : [];
  } catch {
    return [];
  }
};

export const ProductsSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<ProductCard[]>(() =>
    readFromStorage(FAVORITES_STORAGE_KEY),
  );
  const [cart, setCart] = useState<ProductCard[]>(() =>
    readFromStorage(CART_STORAGE_KEY),
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  }, [favorites]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addFavorite = useCallback((product: ProductCard) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.itemId === product.itemId)) {
        return prev;
      }

      return [...prev, product];
    });
  }, []);

  const removeFavorite = useCallback((itemId: string) => {
    setFavorites((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

  const toggleFavorite = useCallback((product: ProductCard) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.itemId === product.itemId);

      if (exists) {
        return prev.filter((item) => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const addToCart = useCallback((product: ProductCard) => {
    setCart((prev) => {
      if (prev.some((item) => item.itemId === product.itemId)) {
        return prev;
      }

      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

  const toggleCart = useCallback((product: ProductCard) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.itemId === product.itemId);

      if (exists) {
        return prev.filter((item) => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favorites.some((item) => item.itemId === itemId),
    [favorites],
  );

  const isInCart = useCallback(
    (itemId: string) => cart.some((item) => item.itemId === itemId),
    [cart],
  );

  const value = useMemo(
    () => ({
      favorites,
      cart,
      isFavorite,
      isInCart,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      addToCart,
      removeFromCart,
      toggleCart,
    }),
    [
      favorites,
      cart,
      isFavorite,
      isInCart,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      addToCart,
      removeFromCart,
      toggleCart,
    ],
  );

  return (
    <ProductsSelectionContext.Provider value={value}>
      {children}
    </ProductsSelectionContext.Provider>
  );
};
