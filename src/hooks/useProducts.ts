import { useEffect, useState } from 'react';
import { products as productsApi } from '@/shared/api/products';
import type { ProductCard } from '@/types/ProductCard';

type SortType = 'new' | 'hot' | 'all' | 'recomended';

export const useProducts = (sortBy: SortType = 'all', limit: number = 24) => {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let fetcher;

    switch (sortBy) {
      case 'hot':
        fetcher = productsApi.getHotDeals(limit);
        break;
      case 'new':
        fetcher = productsApi.getNewArrivals(limit);
        break;
      case 'all':
      default:
        fetcher = productsApi.getLimitedData(limit);
        break;
    }

    fetcher
      .then((data) => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [sortBy, limit]);

  return { products, loading, error };
};
