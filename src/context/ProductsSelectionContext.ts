import { createContext, useContext } from 'react';
import type { ProductCard } from '@/types/ProductCard';

export type ProductsSelectionContextValue = {
  favorites: ProductCard[];
  cart: ProductCard[];
  isFavorite: (itemId: string) => boolean;
  isInCart: (itemId: string) => boolean;
  addFavorite: (product: ProductCard) => void;
  removeFavorite: (itemId: string) => void;
  toggleFavorite: (product: ProductCard) => void;
  addToCart: (product: ProductCard) => void;
  removeFromCart: (itemId: string) => void;
  toggleCart: (product: ProductCard) => void;
};

export const ProductsSelectionContext = createContext<
  ProductsSelectionContextValue | undefined
>(undefined);

export const useProductsSelection = () => {
  const context = useContext(ProductsSelectionContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
