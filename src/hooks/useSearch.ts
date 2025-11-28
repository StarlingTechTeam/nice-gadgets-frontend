import { useState, useEffect } from 'react';
import { searchProducts } from '@services/searchService';
import type { ProductDetails } from '@/types/ProductDetails';

export function useSearch(value: string) {
  const [results, setResults] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      setLoading(true);
      const r = await searchProducts(value);
      setResults(r);
      setLoading(false);
    }, 200);

    return () => clearTimeout(t);
  }, [value]);

  return { results, loading };
}
