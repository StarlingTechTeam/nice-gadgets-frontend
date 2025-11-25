import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ProductCard } from '@/types/ProductCard ';

const FAVORITES_STORAGE_KEY = 'nice-gadgets:favorites';

type FavoritesContextValue = {
  favorites: ProductCard[];
  isFavorite: (itemId: string) => boolean;
  addFavorite: (product: ProductCard) => void;
  removeFavorite: (itemId: string) => void;
  toggleFavorite: (product: ProductCard) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const readFromStorage = (): ProductCard[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed as ProductCard[];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<ProductCard[]>(readFromStorage);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  }, [favorites]);

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

  const isFavorite = useCallback(
    (itemId: string) => favorites.some((item) => item.itemId === itemId),
    [favorites],
  );

  const toggleFavorite = useCallback((product: ProductCard) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.itemId === product.itemId);

      if (exists) {
        return prev.filter((item) => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
