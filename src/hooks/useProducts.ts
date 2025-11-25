import { useEffect, useState } from 'react';
import { products as productsApi } from '@/shared/api/products';
import type { ProductCard } from '@/types/ProductCard ';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    productsApi
      .getAll()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
