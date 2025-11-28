import type { ProductDetails } from '@/types/ProductDetails';
import { productDetailsApi } from '@/shared/api/productDetailsApi';

let cache: ProductDetails[] | null = null;

export async function loadAllProducts() {
  if (!cache) {
    cache = await productDetailsApi.getAll();
  }
  return cache;
}

export async function searchProducts(query: string): Promise<ProductDetails[]> {
  const all = await loadAllProducts();
  const q = query.trim().toLowerCase();

  if (!q) return [];

  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.namespaceId.toLowerCase().includes(q),
  );
}
