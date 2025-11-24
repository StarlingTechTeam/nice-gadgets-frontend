import productsData from '@/shared/api/data/products.json';
import type { ProductCard } from '@/types/ProductCard ';

export const products = {
  getAll: async (): Promise<ProductCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData as ProductCard[]);
      }, 1000);
    });
  },
};

export default products;
